import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
import { Http } from '@angular/http';
import { Transaction } from './dto/Transaction';
import { TransactionStatus } from './dto/TransactionStatus';
import { TransactionType } from './dto/TransactionType';
import { CardType } from './dto/CardType';
import { Country } from './dto/Country';
import { TransactionAlertResponse } from './dto/transactionAlertResponse';
import { ButtonModule, GrowlModule,Message, CalendarModule } from 'primeng/primeng';

@Component({
    selector: 'transaction',
    template: require('./transaction.component.html'),
    styles: [require('../css/AdminLTE.css'), require('../css/skins/skin-blue.css')]
})

export class TransactionComponent {
    public transactionStatuses: TransactionStatus[];
	public transactionTypes: TransactionType[];
	public cardTypes: CardType[];
	public transaction: Transaction;
	public countries: Country;
	public alertResponse: TransactionAlertResponse;
	public msgs: Message[] = [];
	http: Http;

	constructor(http: Http) {
		this.transaction = new Transaction();
		this.alertResponse = new TransactionAlertResponse();
		this.alertResponse.status = "";
		this.msgs.push(
             {
                 severity: 'info',
                 summary: 'Info Message',
                 detail: "aaaaaaa AAAA"
             });

		this.http = http;
		http.get('/api/MasterData/GetCardTypes').subscribe(result => {
            this.cardTypes = result.json();
        });
		 
		http.get('/api/MasterData/GetTransactionStatus').subscribe(result => {
            this.transactionStatuses = result.json();
        }); 
		http.get('/api/MasterData/GetTransactionType').subscribe(result => {
            this.transactionTypes = result.json();
        });
		http.get('/api/MasterData/GetCountries').subscribe(result => {
            this.countries = result.json();
        });
    }

	verify() {
         this.http.post('/api/Transactions/VerifyAlert', this.transaction)
			.subscribe(result => {
              this.alertResponse = result.json();
        });
	  }
}







 

 