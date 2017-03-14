import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('../css/AdminLTE.css'), require('../css/skins/skin-blue.css')]
})

//Perform global operations:
// - login
export class AppComponent {
}
