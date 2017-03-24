import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
import { Http } from '@angular/http';
import { Transaction } from './dto/Transaction';
import { TransactionAlertResponse } from './dto/transactionAlertResponse';
import { ButtonModule, GrowlModule, Message, CalendarModule, Calendar, SelectItem, Button, Dropdown } from 'primeng/primeng';

@Component({
    selector: 'transaction',
    template: require('./transaction.component.html'),
    styles: [require('../css/AdminLTE.css'), require('../css/skins/skin-blue.css')]
})

export class TransactionComponent {
    public smsCode: string;
    public code: string;
    public transaction: Transaction;
    public showTransactionDetails: boolean;
    public alertResponse: TransactionAlertResponse;
    showCredentialsTab: boolean;
 
    message: string;
    http: Http;

    constructor(http: Http) {
		this.transaction = new Transaction();
		this.alertResponse = new TransactionAlertResponse();
		this.alertResponse.status = "";
        this.http = http;

        this.showTransactionDetails = false;
        this.showCredentialsTab = true;
    }

    getTransactionDetails() {
        var transactionRequest = new Transaction();
        this.showTransactionDetails = true;
    }

    saveTransactionStatus(id: Number, status: Number) {
        var transactionRequest = new Transaction();
        transactionRequest.transactionId = id;
        transactionRequest.class = status;
        this.http.post('/api/Transactions/saveTransactionStatus',
            transactionRequest)
            .subscribe(result => {
                this.message = "saved";
            });
    }
}