import { Component, OnInit }  from '@angular/core';
import { Http } from '@angular/http';
import { Transaction } from './dto/Transaction';

@Component({
    selector: 'transaction-list',
    template: require('./transaction-list.component.html'),
    styles: [require('../css/AdminLTE.css'), require('../css/skins/skin-blue.css')]
})
export class TransactionListComponent {
    public transactions: Transaction[];
	public transaction: Transaction;
	http: Http;
    

    constructor(http: Http) {
	    this.http = http;
        this.transaction = new Transaction();
        http.get('/api/Transactions/GetAlerts').subscribe(result => {
            this.transactions = result.json();
        });
    }

	getAlert(id:string) {
	     var idSend = JSON.stringify(id);
         this.http.post('/api/Transactions/GetAlert',
		                id 
						)
			.subscribe(result => {
              this.transaction = result.json();
        });
	  }
} 