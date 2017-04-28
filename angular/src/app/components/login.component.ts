import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { LoginService }         from '../services/login.service';

@Component({
    moduleId:  module.id,
    templateUrl: 'login.component.html',
    providers: [ LoginService,  ],
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(private router: Router,
        private loginService: LoginService){}

    ngOnInit(): void {
        this.loginService.logout();
    }
    
    login() {
        this.loading = true;
        this.loginService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if ( result === true ) {
                    // login successful
                    this.router.navigate(['/']);
                } else {
                    // login failed
                    this.error = "Username or password is invalid. Password is case sensitive!";
                    this.loading = false;
                    this.router.navigate(['/about']);
                }
            });
    }
}
