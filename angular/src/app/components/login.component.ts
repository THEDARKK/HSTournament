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
            .subscribe(data => {
                    this.router.navigate(['/']);
                },
                error => {
                    this.loading = false;
                    this.error = "Username or password is invalid.";
                    this.router.navigate(['/login']);
            });
    }
}
