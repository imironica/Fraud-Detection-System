import { Component, OnInit }  from '@angular/core';
import { Http } from '@angular/http';
import { Transaction } from './dto/Transaction';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, FormControl } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
import { CalendarModule, Calendar } from 'primeng/primeng';

@Component({
    selector: 'transaction-list',
    template: require('./transaction-list.component.html'),
    styles: [require('../css/AdminLTE.css'), require('../css/skins/skin-blue.css')]
})
export class TransactionListComponent {
    public transactions: Transaction[];
	public transaction: Transaction;
	http: Http;
    message: string;
    transactionDate: Date;

    constructor(http: Http) {
	    this.http = http;
        this.transaction = new Transaction();
        this.transactionDate = new Date();
        this.reloadData();
    }

    reloadData() {
        var request = new TransactionListRequest();
        request.transactionDate = this.transactionDate;
        this.http.post('/api/Transactions/GetAlerts', request).subscribe(result => {
            this.transactions = result.json();
        });
    }

	getAlert(id: Number) {
	     var transactionRequest = new Transaction();
		 transactionRequest.transactionId = id;
         this.http.post('/api/Transactions/GetAlert',
		                transactionRequest)
			.subscribe(result => {
              this.transaction = result.json();
        });
	}

    saveTransactionStatus(id: Number, status: Number)
	{
		var transactionRequest = new Transaction();
        transactionRequest.transactionId = id;
        transactionRequest.class = status;
        this.http.post('/api/Transactions/saveTransactionStatus',
		                transactionRequest)
			 .subscribe(result => {
              this.message = "saved";
            });
        this.reloadData();
        //this.transaction.verified = true;
        //window.location.reload();
	}
}

export class TransactionListRequest {
    transactionDate: Date;
}