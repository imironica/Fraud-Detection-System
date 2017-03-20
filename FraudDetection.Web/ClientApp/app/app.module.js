"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var angular2_universal_1 = require("angular2-universal");
var app_component_1 = require("./components/app/app.component");
var home_component_1 = require("./components/home/home.component");
var transaction_list_component_1 = require("./components/transaction/transaction-list.component");
var transaction_component_1 = require("./components/transaction/transaction.component");
var counter_component_1 = require("./components/counter/counter.component");
var navbar_component_1 = require("./components/navbar/navbar.component");
var sidebarmenu_component_1 = require("./components/sidebarmenu/sidebarmenu.component");
var primeng_1 = require("primeng/primeng");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [app_component_1.AppComponent],
        declarations: [
            app_component_1.AppComponent,
            counter_component_1.CounterComponent,
            transaction_list_component_1.TransactionListComponent,
            home_component_1.HomeComponent,
            navbar_component_1.NavbarComponent,
            sidebarmenu_component_1.SidebarMenuComponent,
            transaction_component_1.TransactionComponent
        ],
        imports: [
            angular2_universal_1.UniversalModule,
            forms_1.FormsModule,
            primeng_1.ButtonModule,
            primeng_1.GrowlModule,
            primeng_1.CalendarModule,
            primeng_1.ChartModule,
            forms_1.ReactiveFormsModule,
            router_1.RouterModule.forRoot([
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: 'home', component: home_component_1.HomeComponent },
                { path: 'counter', component: counter_component_1.CounterComponent },
                { path: 'transactions-list', component: transaction_list_component_1.TransactionListComponent },
                { path: 'transaction', component: transaction_component_1.TransactionComponent },
                { path: '**', redirectTo: 'home' }
            ])
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map