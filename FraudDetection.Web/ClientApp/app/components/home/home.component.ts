import { Component, OnInit, AfterViewInit, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Http } from '@angular/http';
import { ChartModule, Message, GMapModule } from 'primeng/primeng';
import { DxVectorMapModule } from 'devextreme-angular';
import $ = require("jquery");
import * as jquery from 'jquery';
import { Country } from '../transaction/dto/Country';
import { TransactionType } from '../transaction/dto/TransactionType';
import { CardType } from '../transaction/dto/CardType';
import { CardVendor } from '../transaction/dto/CardVendor';
import { ClientCountry } from '../transaction/dto/ClientCountry';
import { Merchant } from '../transaction/dto/Merchant';
import { Transaction } from '../transaction/dto/Transaction';
//import { FeatureCollection, Service } from './home.service';
//import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
declare var google: any;
declare var OpenLayers: any;

@Component({
    selector: 'home',
    template: require('./home.component.html'),
    styles: [require('../css/AdminLTE.css'),
             require('../css/skins/skin-blue.css'),
             require('../node_modules/primeng/resources/primeng.min.css'),
             require('../node_modules/primeng/resources/themes/omega/theme.css'),
             require('../node_modules/font-awesome/css/font-awesome.min.css'),
             require('./home.component.css')
    ]
})
export class HomeComponent implements OnInit {
     
    public dashboardStatistics: DashboardStatistics;
    public statisticPerMonth: MonthStatistics;
    public dailyStatisticsPerLastMonth: Array<DailyStatisticsPerLastMonth>;
    public statisticsPerCountry: Array<StatisticsPerCountry>;
    public statisticsPerClientCountry: Array<StatisticsPerClientCountry>;
    public statisticsPerCardVendor: Array<StatisticsPerCardVendor>;
    public statisticsPerCardType: Array<StatisticsPerCardType>;
    public statisticsPerTransactionType: Array<StatisticsPerTransactionType>;
    public countriesWithFraudDetections: Array<CountriesWithFraudDetectionsOnMap>;
       
    msgs: Message[] = [];
    transactionstatistics: any;
    isDataAvailable: boolean = false;
    public transactionTypes: TransactionType[];
    public cardTypes: CardType[];
    public cardVendors: CardVendor[];
    public transaction: Transaction;
    public countries: Country[];
    public merchants: Merchant[] = [];
    public transactions: Transaction[] = [];
    public clientCountries: ClientCountry[];

    public labelsCountries: Array<string> = [];
    public numberOfDetectedFraudsPerCountries: Array<Number> = [];
    public numberOfIncorrectlyDetectedFraudsPerCountries: Array<Number> = [];
    public numberOfSuccessfullyProcessedTransactionsPerCountries: Array<Number> = [];

    public labelsClientCountries: Array<string> = [];
    public numberOfDetectedFraudsPerClientCountries: Array<Number> = [];
    public numberOfIncorrectlyDetectedFraudsPerClientCountries: Array<Number> = [];
    public numberOfSuccessfullyProcessedTransactionsPerClientCountries: Array<Number> = [];

    public labelsCardVendors: Array<string> = [];
    public numberOfDetectedFraudsPerCardVendors: Array<Number> = [];
    public numberOfIncorrectlyDetectedFraudsPerCardVendors: Array<Number> = [];
    public numberOfSuccessfullyProcessedTransactionsPerCardVendors: Array<Number> = [];

    public labelsCardTypes: Array<string> = [];
    public numberOfDetectedFraudsPerCardTypes: Array<Number> = [];
    public numberOfIncorrectlyDetectedFraudsPerCardTypes: Array<Number> = [];
    public numberOfSuccessfullyProcessedTransactionsPerCardTypes: Array<Number> = [];

    public labelsTransactionTypes: Array<string> = [];
    public numberOfDetectedFraudsPerTransactionTypes: Array<Number> = [];
    public numberOfIncorrectlyDetectedFraudsPerTransactionTypes: Array<Number> = [];
    public numberOfSuccessfullyProcessedTransactionsPerTransactionTypes: Array<Number> = [];

    public labelsDailyStatisticsPerLastMonth: Array<string> = [];
    public numberOfDetectedFraudsDailyPerLastMonth: Array<Number> = [];
    public numberOfIncorrectlyDetectedFraudsDaily: Array<Number> = [];
    public numberOfSuccessfullyProcessedTransactionsDaily: Array<Number> = [];

    chartDataCountries: any;
    chartDataClientCountries: any;
    chartDataMonthlyStatistics: any;
    chartDataCardVendors: any;
    chartDataCardTypes: any;
    chartDataTransactionTypes: any;

    countriesOnMap: Array<{ position: { lat: Number, lng: Number }, title: string }> = [];
    countryOnMap: { position: { lat: Number, lng: Number }, title: string };

    names: string[];
    public options: any;
    public overlays: any[];
    public markers: any[] = [];

    constructor(http: Http) {        

        http.get('/api/MasterData/GetTransactionTypes').subscribe(result => {
            this.transactionTypes = result.json();
        });
        http.get('/api/MasterData/GetCardTypes').subscribe(result => {
            this.cardTypes = result.json();
        });
        http.get('/api/MasterData/GetCardVendors').subscribe(result => {
            this.cardVendors = result.json();
        });
        http.get('/api/MasterData/GetCountries').subscribe(result => {
            this.countries = result.json();
        });
        http.get('/api/MasterData/GetClientCountries').subscribe(result => {
            this.clientCountries = result.json();
        });

        http.get('/api/Transactions/GetDashboardStatisticsPerCurrentMonth').subscribe(result => {
            this.statisticPerMonth = result.json();
        });

        http.get('/api/Transactions/GetDashboardDailyStatisticsPerLastMonth').subscribe(result => {
            this.dailyStatisticsPerLastMonth = result.json();
            for (var item of this.dailyStatisticsPerLastMonth) {
                this.labelsDailyStatisticsPerLastMonth.push(item.day);
                this.numberOfDetectedFraudsDailyPerLastMonth.push(item.numberOfDetectedFraudsDailyPerLastMonth);
                this.numberOfIncorrectlyDetectedFraudsDaily.push(item.numberOfIncorrectlyDetectedFrauds);
                this.numberOfSuccessfullyProcessedTransactionsDaily.push(item.numberOfSuccessfullyProcessedTransactions);
            }
        });

        http.get('/api/Transactions/GetDashboardStatisticsPerCountryPerCurrentMonth').subscribe(result => {
            this.statisticsPerCountry = result.json();
            for (var item of this.statisticsPerCountry) {
                this.labelsCountries.push(item.country);
                this.numberOfDetectedFraudsPerCountries.push(item.numberOfDetectedFraudsPerMonth);
                this.numberOfIncorrectlyDetectedFraudsPerCountries.push(item.numberOfIncorrectlyDetectedFrauds);
                this.numberOfSuccessfullyProcessedTransactionsPerCountries.push(item.numberOfSuccessfullyProcessedTransactions);
            }
        });

        http.get('/api/Transactions/GetDashboardStatisticsPerClientCountryPerCurrentMonth').subscribe(result => {
            this.statisticsPerClientCountry = result.json();
            for (var item of this.statisticsPerClientCountry) {
                this.labelsClientCountries.push(item.clientCountry);
                this.numberOfDetectedFraudsPerClientCountries.push(item.numberOfDetectedFraudsPerMonth);
                this.numberOfIncorrectlyDetectedFraudsPerClientCountries.push(item.numberOfIncorrectlyDetectedFrauds);
                this.numberOfSuccessfullyProcessedTransactionsPerClientCountries.push(item.numberOfSuccessfullyProcessedTransactions);
            }
        });

        http.get('/api/Transactions/GetDashboardStatisticsPerCardVendorPerCurrentMonth').subscribe(result => {
            this.statisticsPerCardVendor = result.json();
            for (var item of this.statisticsPerCardVendor) {
                this.labelsCardVendors.push(item.cardVendor);
                this.numberOfDetectedFraudsPerCardVendors.push(item.numberOfDetectedFraudsPerMonth);
                this.numberOfIncorrectlyDetectedFraudsPerCardVendors.push(item.numberOfIncorrectlyDetectedFrauds);
                this.numberOfSuccessfullyProcessedTransactionsPerCardVendors.push(item.numberOfSuccessfullyProcessedTransactions);
            }
        });

        http.get('/api/Transactions/GetDashboardStatisticsPerCardTypePerCurrentMonth').subscribe(result => {
            this.statisticsPerCardType = result.json();
            for (var item of this.statisticsPerCardType) {
                this.labelsCardTypes.push(item.cardType);
                this.numberOfDetectedFraudsPerCardTypes.push(item.numberOfDetectedFraudsPerMonth);
                this.numberOfIncorrectlyDetectedFraudsPerCardTypes.push(item.numberOfIncorrectlyDetectedFrauds);
                this.numberOfSuccessfullyProcessedTransactionsPerCardTypes.push(item.numberOfSuccessfullyProcessedTransactions);
            }
        });

        http.get('/api/Transactions/GetDashboardStatisticsPerTransactionTypePerCurrentMonth').subscribe(result => {
            this.statisticsPerTransactionType = result.json();
            for (var item of this.statisticsPerTransactionType) {
                this.labelsTransactionTypes.push(item.transactionType);
                this.numberOfDetectedFraudsPerTransactionTypes.push(item.numberOfDetectedFraudsPerMonth);
                this.numberOfIncorrectlyDetectedFraudsPerTransactionTypes.push(item.numberOfIncorrectlyDetectedFrauds);
                this.numberOfSuccessfullyProcessedTransactionsPerTransactionTypes.push(item.numberOfSuccessfullyProcessedTransactions);
            }
        });

        http.get('/api/Transactions/GetCountriesWithFraudDetections').subscribe(result => {
            this.countriesWithFraudDetections = result.json();
            for (let item of this.countriesWithFraudDetections) {
                this.markers.push(new google.maps.Marker({ position: { lat: item.latitude, lng: item.longitude }, title: item.country }));
                console.log("lat: " + item.latitude + ", lng: " + item.longitude + ", country: " + item.country);
            }
        });

        //========= map =========
        //function initMap() {
        //    var map = new google.maps.Map(document.getElementById('map'), {
        //        center: { lat: 45.943161, lng: 24.96676 },
        //        //scrollwheel: false,
        //        zoom: 2
        //    });
        //}

        this.options = {
            center: { lat: 45.943161, lng: 24.96676 },
            //scrollwheel: true,
            zoom: 3
        };

        this.overlays = this.markers;

        //this.overlays = [
        //    new google.maps.Marker({ position: { lat: 36.879466, lng: 30.667648 }, title: "Konyaalti" }),
        //    new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
        //    new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" })

        //     Polygons, Polyline, Circle -> TBD how to use

        //    new google.maps.Polygon({
        //        paths: [
        //            { lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
        //        ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
        //    }),
        //    new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
        //    new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
        //];

        // =====doughnut per countries ====

        this.chartDataCountries = {
            labels: this.labelsCountries,
            datasets: [
                {
                    data: this.numberOfDetectedFraudsPerCountries,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#008b8b",
                        "#006400",
                        "#ee7600",
                        "#9a32cd",
                        "#528b8b",
                        "#8b0a50",
                        "#b22222",
                        "#cd5555",
                        "#cd5555",
                        "#66cdaa",
                        "#ff4500",
                        "#3a5fcd"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#008b8b",
                        "#006400",
                        "#ee7600",
                        "#9a32cd",
                        "#528b8b",
                        "#8b0a50",
                        "#b22222",
                        "#cd5555",
                        "#cd5555",
                        "#66cdaa",
                        "#ff4500",
                        "#3a5fcd"
                    ]
                }
            ]
        };

        // ===== doughnut per client countries ====

        this.chartDataClientCountries = {
            labels: this.labelsClientCountries,
            datasets: [
                {
                    data: this.numberOfDetectedFraudsPerClientCountries,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#008b8b",
                        "#006400",
                        "#ee7600",
                        "#9a32cd",
                        "#528b8b",
                        "#8b0a50",
                        "#b22222",
                        "#cd5555",
                        "#cd5555",
                        "#66cdaa",
                        "#ff4500",
                        "#3a5fcd",
                        "#00ee00",
                        "#ffd700"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#008b8b",
                        "#006400",
                        "#ee7600",
                        "#9a32cd",
                        "#528b8b",
                        "#8b0a50",
                        "#b22222",
                        "#cd5555",
                        "#cd5555",
                        "#66cdaa",
                        "#ff4500",
                        "#3a5fcd",
                        "#00ee00",
                        "#ffd700"
                    ]
                }
            ]
        };

        //====line chart====
        this.chartDataMonthlyStatistics = {
            labels: this.labelsDailyStatisticsPerLastMonth,
            datasets: [
                {
                    label: 'Fraud Detections',
                    data: this.numberOfDetectedFraudsDailyPerLastMonth,
                    fill: false,
                    borderColor: '#cd0000'
                }
            ]
        }

        //====bar chart======
        this.chartDataTransactionTypes = {
            labels: this.labelsTransactionTypes,
            datasets: [
                {
                    label: 'Fraud Detections',
                    backgroundColor: '#cd0000',
                    borderColor: '#cd0000',
                    data: this.numberOfDetectedFraudsPerTransactionTypes
                }
            ]
        }

        //====== polar chart =======
        this.chartDataCardVendors = {
            datasets: [{
                data: this.numberOfDetectedFraudsPerCardVendors,
                backgroundColor: [
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB"
                ],
                label: 'Card Vendors'
            }],
            labels: this.labelsCardVendors
        }
    }

    selectData(event) {
        this.msgs = [];
        this.msgs.push({
            severity: 'info',
            summary: 'Data Selected',
            'detail': this.chartDataMonthlyStatistics.datasets[event.element._datasetIndex].data[event.element._index]
        });
    }

    ngOnInit() {
        
    } 
}

export class CountriesWithFraudDetectionsOnMap {
    country: string;
    longitude: Number;
    latitude: Number;
}

export class MonthStatistics {
    numberOfDetectedFraudsPerCurrentMonth: Number;
    numberOfGoodTransactions: Number;
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

export class DailyStatisticsPerLastMonth {
    day: string;
    numberOfDetectedFraudsDailyPerLastMonth: Number;
    numberOfIncorrectlyDetectedFrauds: Number;
    numberOfSuccessfullyProcessedTransactions: Number;
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

export class StatisticsPerClientCountry {
    numberOfDetectedFraudsPerMonth: Number;
    numberOfSuccessfullyProcessedTransactions: Number;
    numberOfIncorrectlyDetectedFrauds: Number;
    clientCountry: string;
    constructor(numberOfDetectedFraudsPerMonth: Number,
        numberOfSuccessfullyProcessedTransactions: Number,
        numberOfIncorrectlyDetectedFrauds: Number,
        clientCountry: string) {
        this.numberOfDetectedFraudsPerMonth = numberOfDetectedFraudsPerMonth;
        this.numberOfSuccessfullyProcessedTransactions = numberOfSuccessfullyProcessedTransactions;
        this.numberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;
        this.clientCountry = clientCountry;
    }
}

export class StatisticsPerCardVendor {
    numberOfDetectedFraudsPerMonth: Number;
    numberOfSuccessfullyProcessedTransactions: Number;
    numberOfIncorrectlyDetectedFrauds: Number;
    cardVendor: string;
    constructor(numberOfDetectedFraudsPerMonth: Number,
        numberOfSuccessfullyProcessedTransactions: Number,
        numberOfIncorrectlyDetectedFrauds: Number,
        cardVendor: string) {
        this.numberOfDetectedFraudsPerMonth = numberOfDetectedFraudsPerMonth;
        this.numberOfSuccessfullyProcessedTransactions = numberOfSuccessfullyProcessedTransactions;
        this.numberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;
        this.cardVendor = cardVendor;
    }
}

export class StatisticsPerCardType {
    numberOfDetectedFraudsPerMonth: Number;
    numberOfSuccessfullyProcessedTransactions: Number;
    numberOfIncorrectlyDetectedFrauds: Number;
    cardType: string;
    constructor(numberOfDetectedFraudsPerMonth: Number,
        numberOfSuccessfullyProcessedTransactions: Number,
        numberOfIncorrectlyDetectedFrauds: Number,
        cardType: string) {
        this.numberOfDetectedFraudsPerMonth = numberOfDetectedFraudsPerMonth;
        this.numberOfSuccessfullyProcessedTransactions = numberOfSuccessfullyProcessedTransactions;
        this.numberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;
        this.cardType = cardType;
    }
}

export class StatisticsPerTransactionType {
    numberOfDetectedFraudsPerMonth: Number;
    numberOfSuccessfullyProcessedTransactions: Number;
    numberOfIncorrectlyDetectedFrauds: Number;
    transactionType: string;
    constructor(numberOfDetectedFraudsPerMonth: Number,
        numberOfSuccessfullyProcessedTransactions: Number,
        numberOfIncorrectlyDetectedFrauds: Number,
        transactionType: string) {
        this.numberOfDetectedFraudsPerMonth = numberOfDetectedFraudsPerMonth;
        this.numberOfSuccessfullyProcessedTransactions = numberOfSuccessfullyProcessedTransactions;
        this.numberOfIncorrectlyDetectedFrauds = numberOfIncorrectlyDetectedFrauds;
        this.transactionType = transactionType;
    }
}

export class DashboardStatistics
{
    currentMonthStatistics: MonthStatistics;
	statisticsPerCountry:StatisticsPerCountry[];
    statisticsPerClientCountry: StatisticsPerClientCountry[];
    statisticsPerCardVendor: StatisticsPerCardVendor[];
    statisticsPerCardType: StatisticsPerCardType[];
    statisticsPerTransactionType: StatisticsPerTransactionType[];
}