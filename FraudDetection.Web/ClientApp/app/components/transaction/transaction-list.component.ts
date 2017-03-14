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

    constructor(http: Http) {
    
        http.get('/api/Transactions/GetAlerts').subscribe(result => {
            this.transactions = result.json();
        });
    }
} 