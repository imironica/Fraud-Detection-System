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
var DailyStatistics = (function () {
    function DailyStatistics(numberOfUnprocessedAlerts, numberProcessedAlerts, numberOfFraudsDetected) {
        this.numberProcessedAlerts = numberProcessedAlerts;
        this.numberOfFraudsDetected = numberOfFraudsDetected;
        this.numberOfUnprocessedAlerts = numberOfUnprocessedAlerts;
    }
    return DailyStatistics;
}());
exports.DailyStatistics = DailyStatistics;
var SidebarMenuComponent = (function () {
    function SidebarMenuComponent(http) {
        var _this = this;
        this.currentStatistics = new DailyStatistics(0, 0, 0);
        http.get('/api/Transactions/GetDailyStatistics').subscribe(function (result) {
            _this.currentStatistics = result.json();
        });
    }
    return SidebarMenuComponent;
}());
SidebarMenuComponent = __decorate([
    core_1.Component({
        selector: 'sidebar-menu',
        template: require('./sidebarmenu.component.html'),
        styles: [require('../css/AdminLTE.css'), require('../css/skins/skin-blue.css')]
    }),
    __metadata("design:paramtypes", [http_1.Http])
], SidebarMenuComponent);
exports.SidebarMenuComponent = SidebarMenuComponent;
//# sourceMappingURL=sidebarmenu.component.js.map