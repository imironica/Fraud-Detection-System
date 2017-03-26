import { Component, OnInit, AfterViewInit, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Http } from '@angular/http';
import { ChartModule, Message } from 'primeng/primeng';
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

    options: any;
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

    names: string[];

    constructor(http: Http) {
        //this.statisticPerMonth = new MonthStatistics(300, 50, 100);
		//this.dashboardStatistics = new DashboardStatistics();
        //this.dashboardStatistics.currentMonthStatistics = this.statisticPerMonth;

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

        //this.chartDataMonthlyStatistics = {
        //    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
        //    datasets: [
        //        {
        //            label: 'Fraud Detections',
        //            data: [5, 10, 8, 3, 15, 6, 11, 18, 7, 10, 3, 15, 6, 11, 5, 10, 8, 7, 10, 3, 13, 8, 6, 19 ],
        //            fill: false,
        //            borderColor: '#cd0000'
        //        }
        //    ]
        //}

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