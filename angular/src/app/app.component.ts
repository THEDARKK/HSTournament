import { Component, OnInit } from '@angular/core';

import { User } from './models/user.model';
import { LoginService } from './services/login.service';


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css', ],
    providers: [ LoginService, ],
})

export class AppComponent implements OnInit {
    currentUser: User;
    subscription: any;
    loggedIn: boolean = false;

    constructor(private loginService: LoginService){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(){
        console.log(this.currentUser);
        this.subscription = this.loginService.status.subscribe(status => {
            this.loggedIn = status;
        });
    }

    ngOnDestroy(){
        this.subscription.unsubcribe();
    }
}
