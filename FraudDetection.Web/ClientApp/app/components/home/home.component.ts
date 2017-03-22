import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { ChartModule } from 'primeng/primeng';
import $ = require("jquery");
import { Country } from '../transaction/dto/Country';

@Component({
    selector: 'home',
    template: require('./home.component.html'),
    styles: [require('../css/AdminLTE.css'),
             require('../css/skins/skin-blue.css'),
             require('../node_modules/primeng/resources/primeng.min.css'),
             require('../node_modules/primeng/resources/themes/omega/theme.css'),
             require('../node_modules/font-awesome/css/font-awesome.min.css'),
             require('../node_modules/admin-lte/plugins/jvectormap/jquery-jvectormap-1.2.2.css')
    ]
})
export class HomeComponent implements OnInit {
     
    public dashboardStatistics: DashboardStatistics;
    public statisticPerMonth: MonthStatistics;
    options: any; data: any; transactionstatistics: any;
    isDataAvailable: boolean = false;
    public countries: Country[];

    constructor(http: Http) {
        this.statisticPerMonth = new MonthStatistics(300, 50, 100);
		this.dashboardStatistics = new DashboardStatistics();
		this.dashboardStatistics.currentMonthStatistics = this.statisticPerMonth;
        http.get('/api/Transactions/GetDashboardStatisticsPerCurrentMonth').subscribe(result => {
            this.statisticPerMonth = result.json();
        });

        //TODO: get transactions 
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

        http.get('/api/MasterData/GetCountries').subscribe(result => {
            this.countries = result.json();
        });
        
        //https://codepen.io/oubipaws/pen/WwJQKj  (map example: html, css, js)

        //<div id="map" ></div>

        //TODO: get all countries from transactions
        //let tuple: [Number, Number, string];
        //let points: [
        //    { latLng: [Number, Number], name: string }
        //];

        //for (let i = 0; i < this.countries.length; i++) {
        //    tuple.push(this.countries[i].latitude.min, this.countries[i].longitude.max, this.countries[i].name);
        //    // here get the properties from transaction
        //    points.push({ latLng: [this.countries[i].latitude.min, this.countries[i].longitude.max], name: this.countries[i].name });
        //}

        //$(function () {
        //    $('#map').vectorMap({
        //        map: 'world_mill',
        //        scaleColors: ['#C8EEFF', '#0071A4'],
        //        normalizeFunction: 'polynomial',
        //        hoverOpacity: 0.7,
        //        hoverColor: false,
        //        markerStyle: {
        //            initial: {
        //                fill: '#F8E23B',
        //                stroke: '#383f47'
        //            }
        //        },
        //        backgroundColor: '#383f47',
        //        markers: points
        //    });
        //});
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