import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'home',
    template: require('./home.component.html'),
    styles: [require('../css/AdminLTE.css'), require('../css/skins/skin-blue.css')]
})
export class HomeComponent {
     
    public dashboardStatistics: DashboardStatistics;
	public statisticPerMonth:MonthStatistics;
	options: Object;

    constructor(http: Http) {
		this.statisticPerMonth = new MonthStatistics(0,0,0);
		this.dashboardStatistics = new DashboardStatistics();
		this.dashboardStatistics.currentMonthStatistics = this.statisticPerMonth;
        http.get('/api/Transactions/GetDashboardStatisticsPerCurrentMonth').subscribe(result => {
            this.statisticPerMonth = result.json();
        });

    }
}

export class MonthStatistics {
    numberOfDetectedFraudsPerCurrentMonth: Number;
    numberOfSuccessfullyProcessedTransactions: Number;
    numberOfIncorrectlyDetectedFrauds: Number;
	constructor(numberOfDetectedFraudsPerCurrentMonth: Number, 
	            numberOfSuccessfullyProcessedTransactions:Number,
	             numberOfIncorrectlyDetectedFrauds:Number) {
        this.numberOfDetectedFraudsPerCurrentMonth = numberOfDetectedFraudsPerCurrentMonth;
		this.numberOfSuccessfullyProcessedTransactions = numberOfSuccessfullyProcessedTransactions;
		this.numberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;
    }
}

export class StatisticsPerCountry {
    numberOfDetectedFraudsPerMonth: Number;
    numberOfSuccessfullyProcessedTransactions: Number;
    numberOfIncorrectlyDetectedFrauds: Number;
	country: string;
	constructor(numberOfDetectedFraudsPerMonth: Number, 
	            numberOfSuccessfullyProcessedTransactions:Number,
	            numberOfIncorrectlyDetectedFrauds:Number,
				country: string) {
        this.numberOfDetectedFraudsPerMonth = numberOfDetectedFraudsPerMonth;
		this.numberOfSuccessfullyProcessedTransactions = numberOfSuccessfullyProcessedTransactions;
		this.numberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;
		this.country = country;
    }
}

 

export class DashboardStatistics
{
	statisticsPerCountry:StatisticsPerCountry[];
	currentMonthStatistics:MonthStatistics;
}

   