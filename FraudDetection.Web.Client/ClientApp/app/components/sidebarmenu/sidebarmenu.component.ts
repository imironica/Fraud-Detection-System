import { Component } from '@angular/core';
import { Http } from '@angular/http';

export class DailyStatistics {
    numberOfUnprocessedAlerts: Number;
    numberProcessedAlerts: Number;
    numberOfFraudsDetected: Number;
	constructor(numberOfUnprocessedAlerts: Number, numberProcessedAlerts:Number,
	             numberOfFraudsDetected:Number) {
        this.numberProcessedAlerts = numberProcessedAlerts;
		this.numberOfFraudsDetected = numberOfFraudsDetected;
		this.numberOfUnprocessedAlerts = numberOfUnprocessedAlerts;
    }
}


@Component({
    selector: 'sidebar-menu',
    template: require('./sidebarmenu.component.html'),
    styles: [require('../css/AdminLTE.css'), require('../css/skins/skin-blue.css')]
})
export class SidebarMenuComponent {
    public currentStatistics: DailyStatistics;

    constructor(http: Http) {
		this.currentStatistics = new DailyStatistics(0,0,0);
        http.get('/api/Transactions/GetDailyStatistics').subscribe(result => {
            this.currentStatistics = result.json();

        });
    }
}

