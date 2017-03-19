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
		this.statisticPerMonth = new MonthStatistics(0,0,0);
		this.dashboardStatistics = new DashboardStatistics();
		this.dashboardStatistics.currentMonthStatistics = this.statisticPerMonth;
        http.get('/api/Transactions/GetDashboardStatisticsPerCurrentMonth').subscribe(result => {
            this.statisticPerMonth = result.json();
        });

        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Anger',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Contempt',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
                ,
                {
                    label: 'Disgust',
                    backgroundColor: '#FF99E6',
                    borderColor: '#7CB342',
                    data: [28, 11, 40, 12, 33, 13, 90]
                }
                ,
                {
                    label: 'Fear',
                    backgroundColor: '#66C2FF',
                    borderColor: '#7CB342',
                    data: [28, 2, 40, 19, 12, 27, 9]
                }
                ,
                {
                    label: 'Happiness',
                    backgroundColor: '#FF5050',
                    borderColor: '#7CB342',
                    data: [28, 48, 140, 119, 86, 127, 90]
                }
                ,
                {
                    label: 'Neutral',
                    backgroundColor: '#DDDDDD',
                    borderColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
                },
                {
                    label: 'Sadness',
                    backgroundColor: ' #8585AD',
                    borderColor: '#7CB342',
                    data: [23, 48, 34, 54, 86, 27, 65]
                },
                {
                    label: 'Surprise',
                    backgroundColor: '#FF9966',
                    borderColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
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