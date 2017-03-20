import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { ChartModule } from 'primeng/primeng';
//import { Chart } from 'chart.js';

@Component({
    selector: 'home',
    template: require('./home.component.html'),
    styles: [require('../css/AdminLTE.css'), require('../css/skins/skin-blue.css'),
             require('../node_modules/primeng/resources/primeng.min.css'),
             require('../node_modules/primeng/resources/themes/omega/theme.css'),
             require('../node_modules/font-awesome/css/font-awesome.min.css')
    ]
})
export class HomeComponent implements OnInit {
     
    public dashboardStatistics: DashboardStatistics;
    public statisticPerMonth: MonthStatistics;
    options: any; data: any; transactionstatistics: any;
    isDataAvailable: boolean = false;

    constructor(http: Http) {
        this.statisticPerMonth = new MonthStatistics(300, 50, 100);
		this.dashboardStatistics = new DashboardStatistics();
		this.dashboardStatistics.currentMonthStatistics = this.statisticPerMonth;
        http.get('/api/Transactions/GetDashboardStatisticsPerCurrentMonth').subscribe(result => {
            this.statisticPerMonth = result.json();
        });

        this.data = {
            labels: ['Romania', 'Germany', 'France'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]    
        };
    }
    ngOnInit() {
        
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