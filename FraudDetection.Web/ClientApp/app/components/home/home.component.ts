import { Component, OnInit, AfterViewInit, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Http } from '@angular/http';
import { ChartModule, Message } from 'primeng/primeng';
import { DxVectorMapModule } from 'devextreme-angular';
import $ = require("jquery");
import * as jquery from 'jquery';
import { Country } from '../transaction/dto/Country';
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
    options: any;
    doughnutdata: any;
    linedata: any;
    polardata: any;
    msgs: Message[] = [];
    transactionstatistics: any;
    isDataAvailable: boolean = false;
    public countries: Country[];
    //mapdatasource: mapsData.world;
    //worldMap: any;
    //markers: FeatureCollection;
    names: string[];

    constructor(http: Http) {//, service: Service
        this.statisticPerMonth = new MonthStatistics(300, 50, 100);
		this.dashboardStatistics = new DashboardStatistics();
		this.dashboardStatistics.currentMonthStatistics = this.statisticPerMonth;
        http.get('/api/Transactions/GetDashboardStatisticsPerCurrentMonth').subscribe(result => {
            this.statisticPerMonth = result.json();
        });

        // =====doughnut====
        //TODO: get transactions 
        this.doughnutdata = {
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

        //====line chart=====
        this.linedata = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#4bc0c0'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#565656'
                }
            ]
        }

        http.get('/api/MasterData/GetCountries').subscribe(result => {
            this.countries = result.json();
        });

        //====== polar chart =======
        this.polardata = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    3,
                    14
                ],
                backgroundColor: [
                    "#FF6384",
                    "#4BC0C0",
                    "#FFCE56",
                    "#E7E9ED",
                    "#36A2EB"
                ],
                label: 'My dataset'
            }],
            labels: [
                "Red",
                "Green",
                "Yellow",
                "Grey",
                "Blue"
            ]
        }

        //this.markers = service.getMarkers();
        //this.names = service.getNames();
        //this.customizeText = this.customizeText.bind(this);


    }

    //customizeText(arg) {
    //    return this.names[arg.index];
    //}

    //customizeTooltip(arg) {
    //    if (arg.layer.type === "marker") {
    //        return {
    //            text: arg.attribute("tooltip")
    //        };
    //    }
    //}

    selectData(event) {
        this.msgs = [];
        this.msgs.push({
            severity: 'info',
            summary: 'Data Selected',
                     'detail': this.linedata.datasets[event.element._datasetIndex].data[event.element._index]
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


//export class FeatureCollection {
//    type: string;
//    features: Feature[];
//}

//export class Feature {
//    type: string;
//    properties: FeatureProperty;
//    geometry: FeatureGeometry;
//}

//export class FeatureProperty {
//    values: number[];
//    tooltip: string;
//}

//export class FeatureGeometry {
//    type: string;
//    coordinates: number[];
//}

//let names: string[] = ["Christian", "Muslim", "Unaffiliated", "Buddhist", "Jewish"];

//let markers: FeatureCollection = {
//    type: "FeatureCollection",
//    features: jquery.map([{
//        coordinates: [34.6, -5.1],
//        values: [61.4, 35.2, 1.4, 0, 0],
//        country: "Tanzania"
//    }, {
//        coordinates: [18.8, 15],
//        values: [40.6, 55.3, 2.5, 0, 0],
//        country: "Chad"
//    }, {
//        coordinates: [7.36, 9.97],
//        values: [49.3, 48.8, 0.4, 0, 0],
//        country: "Nigeria"
//    }, {
//        coordinates: [135.61, -24.57],
//        values: [67.3, 2.4, 24.2, 2.7, 0.5],
//        country: "Australia"
//    }, {
//        coordinates: [103.3, 34.85],
//        values: [5.1, 1.8, 52.2, 18.2, 0],
//        country: "China"
//    }, {
//        coordinates: [139.5, 37],
//        values: [1.6, 0.2, 57, 36.2, 0],
//        country: "Japan"
//    }, {
//        coordinates: [100.8, 15.9],
//        values: [0.9, 5.5, 0.3, 93.2, 0],
//        country: "Thailand"
//    }, {
//        coordinates: [10.4, 51.4],
//        values: [68.7, 5.8, 24.7, 0.3, 0.3],
//        country: "Germany"
//    }, {
//        coordinates: [100.8, 65.3],
//        values: [73.3, 10, 16.2, 0.1, 0.2],
//        country: "Russia"
//    }, {
//        coordinates: [-3.48, 40.36],
//        values: [78.6, 2.1, 19, 0, 0.1],
//        country: "Spain"
//    }, {
//        coordinates: [-78.01, 21.72],
//        values: [59.2, 0, 23, 0, 0],
//        country: "Cuba"
//    }, {
//        coordinates: [-63.7, -31.92],
//        values: [85.2, 1, 12.2, 0.05, 0.5],
//        country: "Argentina"
//    }, {
//        coordinates: [-110.53, 60.78],
//        values: [69, 2.1, 23.7, 0.5, 0.3],
//        country: "Canada"
//    }, {
//        coordinates: [-100.1, 40.14],
//        values: [78.3, 0.9, 16.4, 1.2, 1.8],
//        country: "United States"
//    }, {
//        coordinates: [34.88, 31.16],
//        values: [2, 18.6, 3.1, 0.3, 75.6],
//        country: "Israel"
//    }], function (data) {
//        let list = ["<b>" + data.country + "</b>"];
//        $.each(data.values, function (i, value) {
//            if (value > 0) {
//                list.push(names[i] + ": " + value + "%");
//            }
//        });
//        return {
//            type: "Feature",
//            geometry: {
//                type: "Point",
//                coordinates: data.coordinates
//            },
//            properties: {
//                tooltip: list.join("\n"),
//                values: data.values
//            }
//        };
//    })
//};

//@Injectable()
//export class Service {
//    getMarkers(): FeatureCollection {
//        return markers;
//    }

//    getNames(): string[] {
//        return names;
//    }
//}