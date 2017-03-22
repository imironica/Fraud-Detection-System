"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var Transaction_1 = require("./dto/Transaction");
var transactionAlertResponse_1 = require("./dto/transactionAlertResponse");
var TransactionComponent = (function () {
    function TransactionComponent(http, fb) {
        var _this = this;
        this.fb = fb;
        this.msgs = [];
        this.hasTransactionTypeError = false;
        this.hasCardTypeError = false;
        this.hasTransactionCurrencyError = false;
        this.currencies = ['EUR', 'RON', 'USD'];
        this.hasClientCountryError = false;
        this.hasMerchantCountryError = false;
        this.transaction = new Transaction_1.Transaction();
        this.alertResponse = new transactionAlertResponse_1.TransactionAlertResponse();
        this.alertResponse.status = "";
        this.msgs.push({
            severity: 'info',
            summary: 'Info Message',
            detail: "aaaaaaa AAAA"
        });
        this.http = http;
        http.get('/api/MasterData/GetCardTypes').subscribe(function (result) {
            _this.cardTypes = result.json();
        });
        http.get('/api/MasterData/GetTransactionStatus').subscribe(function (result) {
            _this.transactionStatuses = result.json();
        });
        http.get('/api/MasterData/GetTransactionType').subscribe(function (result) {
            _this.transactionTypes = result.json();
        });
        http.get('/api/MasterData/GetCountries').subscribe(function (result) {
            _this.countries = result.json();
        });
    }
    TransactionComponent.prototype.ngOnInit = function () {
        this.transactionform = this.fb.group({
            'transactionType': new forms_1.FormControl('', forms_1.Validators.required),
            'cardType': new forms_1.FormControl('', forms_1.Validators.required),
            'amount': new forms_1.FormControl('', forms_1.Validators.required),
            'transactionDate': new forms_1.FormControl('', forms_1.Validators.required),
            'loginAtempts': new forms_1.FormControl('', forms_1.Validators.required),
            'clientCountry': new forms_1.FormControl('', forms_1.Validators.required),
            'lastTransactionDate': new forms_1.FormControl('', forms_1.Validators.required),
            'spentMoneyPerDay': new forms_1.FormControl('', forms_1.Validators.required),
            'amountPerLastMonth': new forms_1.FormControl('', forms_1.Validators.required),
            'cardNumber': new forms_1.FormControl('', forms_1.Validators.required),
            'cardExpiryDate': new forms_1.FormControl('', forms_1.Validators.required),
            'merchantCountry': new forms_1.FormControl('', forms_1.Validators.required),
            'merchant': new forms_1.FormControl('', forms_1.Validators.required),
            'longitude': new forms_1.FormControl('', forms_1.Validators.required),
            'latitude': new forms_1.FormControl('', forms_1.Validators.required)
        });
    };
    TransactionComponent.prototype.verify = function () {
        var _this = this;
        this.http.post('/api/Transactions/VerifyAlert', this.transaction)
            .subscribe(function (result) {
            _this.alertResponse = result.json();
        });
    };
    TransactionComponent.prototype.validateTransactionType = function (value) {
        if (value === '')
            this.hasTransactionTypeError = true;
        else
            this.hasTransactionTypeError = false;
    };
    TransactionComponent.prototype.validateCardType = function (value) {
        if (value === '')
            this.hasCardTypeError = true;
        else
            this.hasCardTypeError = false;
    };
    TransactionComponent.prototype.validateTransactionCurrencyError = function (value) {
        if (value === '')
            this.hasTransactionCurrencyError = true;
        else
            this.hasTransactionCurrencyError = false;
    };
    TransactionComponent.prototype.validateClientCountry = function (value) {
        if (value === '')
            this.hasClientCountryError = true;
        else
            this.hasClientCountryError = false;
    };
    TransactionComponent.prototype.validateMerchantCountry = function (value) {
        if (value === '')
            this.hasMerchantCountryError = true;
        else
            this.hasMerchantCountryError = false;
    };
    return TransactionComponent;
}());
TransactionComponent = __decorate([
    core_1.Component({
        selector: 'transaction',
        template: require('./transaction.component.html'),
        styles: [require('../css/AdminLTE.css'), require('../css/skins/skin-blue.css')]
    }),
    __metadata("design:paramtypes", [http_1.Http, forms_1.FormBuilder])
], TransactionComponent);
exports.TransactionComponent = TransactionComponent;
//# sourceMappingURL=transaction.component.js.map