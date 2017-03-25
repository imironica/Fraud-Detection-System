import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
import { Http } from '@angular/http';
import { Transaction } from './dto/Transaction';
import { TransactionClientResponse } from './dto/transactionClientResponse';
import { TransactionQuery } from './dto/TransactionQuery';

@Component({
    selector: 'transaction',
    template: require('./transaction.component.html')
})

export class TransactionComponent {
    smsCode: string;
    code: string;
    transaction: Transaction;
    showTransactionDetailsCode: number;

    showTransactionDetails: boolean;
    transactionResponse: TransactionClientResponse;
    alertStatus: string;
    showCredentialsTab : boolean;
 
    message: string;
    http: Http;

    constructor(http: Http) {
 
        this.alertStatus = "";
        this.http = http;
        this.showTransactionDetailsCode = 0;
        this.showTransactionDetails = false;
        this.showCredentialsTab = true;
    }

    public showTransaction(){
        
        var transactionQuery = new TransactionQuery();
        transactionQuery.code = this.code;
        transactionQuery.smsCode = this.smsCode;
        this.alertStatus = '';
        this.http.post('/api/Transactions/GetTransactionDetails',
            transactionQuery)
            .subscribe(result => {
                this.transactionResponse = result.json();

                if (this.transactionResponse.transactionStatus == 'VALID') {
                    this.showCredentialsTab = false;
                    this.transaction = this.transactionResponse.transaction;
                    this.showTransactionDetailsCode = 1;
                }
                if (this.transactionResponse.transactionStatus == 'INVALID') {
                    this.transaction = this.transactionResponse.transaction;
                    this.message = this.transactionResponse.message;
                    this.alertStatus = 'INVALID';
                }
               
            });
    }

    saveTransactionStatus(id: Number, status: Number) {
        var transactionRequest = new Transaction();
        transactionRequest.transactionId = id;
        transactionRequest.class = status;
        this.http.post('/api/Transactions/saveTransactionStatus',
            transactionRequest)
            .subscribe(result => {
                this.message = "";
            });
        if (status == 0)
            this.alertStatus = "ALERT";
        if (status == 1)
            this.alertStatus = 'SECURE'
        this.showTransactionDetailsCode = 0;
    }
}