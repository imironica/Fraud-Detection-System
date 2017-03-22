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
var http_1 = require("@angular/http");
var Transaction_1 = require("./dto/Transaction");
var TransactionListComponent = (function () {
    function TransactionListComponent(http) {
        this.http = http;
        this.transaction = new Transaction_1.Transaction();
        this.reloadData();
    }
    TransactionListComponent.prototype.reloadData = function () {
        var _this = this;
        this.http.get('/api/Transactions/GetAlerts').subscribe(function (result) {
            _this.transactions = result.json();
        });
    };
    TransactionListComponent.prototype.getAlert = function (id) {
        var _this = this;
        var transactionRequest = new Transaction_1.Transaction();
        transactionRequest.transactionID = id;
        this.http.post('/api/Transactions/GetAlert', transactionRequest)
            .subscribe(function (result) {
            _this.transaction = result.json();
        });
    };
    TransactionListComponent.prototype.saveTransactionStatus = function (id, status) {
        var _this = this;
        var transactionRequest = new Transaction_1.Transaction();
        transactionRequest.transactionID = id;
        transactionRequest.class = status;
        this.http.post('/api/Transactions/saveTransactionStatus', transactionRequest)
            .subscribe(function (result) {
            _this.message = "saved";
        });
        window.location.reload();
    };
    return TransactionListComponent;
}());
TransactionListComponent = __decorate([
    core_1.Component({
        selector: 'transaction-list',
        template: require('./transaction-list.component.html'),
        styles: [require('../css/AdminLTE.css'), require('../css/skins/skin-blue.css')]
    }),
    __metadata("design:paramtypes", [http_1.Http])
], TransactionListComponent);
exports.TransactionListComponent = TransactionListComponent;
//# sourceMappingURL=transaction-list.component.js.map