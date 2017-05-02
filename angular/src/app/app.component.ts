import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

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

    constructor(private loginService: LoginService,
                private router: Router){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit(){
        if (!this.currentUser) {
            this.router.navigate(['/login']);
        }
    }

    ngOnDestroy(){
    }
}
