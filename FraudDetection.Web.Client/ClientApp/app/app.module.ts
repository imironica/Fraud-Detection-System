import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { TransactionComponent } from './components/transaction/transaction.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarMenuComponent } from './components/sidebarmenu/sidebarmenu.component';
import { AccordionModule, ButtonModule, Message, GrowlModule, CalendarModule, MenuItem, ChartModule, Calendar, SelectItem, Button, Dropdown } from 'primeng/primeng';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarMenuComponent,
        TransactionComponent
    ],
    imports: [
        UniversalModule, 
        FormsModule,
        ButtonModule,
        GrowlModule,
        CalendarModule,
        ChartModule,
        ReactiveFormsModule,
		RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: TransactionComponent },
            { path: 'transaction', component: TransactionComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}
