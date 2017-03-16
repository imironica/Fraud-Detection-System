import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { HomeComponent } from './components/home/home.component';
import { TransactionListComponent } from './components/transaction/transaction-list.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { CounterComponent } from './components/counter/counter.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarMenuComponent } from './components/sidebarmenu/sidebarmenu.component';
import { ButtonModule, GrowlModule, CalendarModule } from 'primeng/primeng';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        CounterComponent,
        TransactionListComponent,
        HomeComponent,
        NavbarComponent,
        SidebarMenuComponent,
        TransactionComponent
    ],
    imports: [
        UniversalModule, 
        FormsModule,
		RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'transactions-list', component: TransactionListComponent },
            { path: 'transaction', component: TransactionComponent },
            { path: '**', redirectTo: 'home' }
        ]),
		ButtonModule, GrowlModule, CalendarModule
    ]
})
export class AppModule {
}
