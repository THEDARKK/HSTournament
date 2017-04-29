import { Injectable, Output, EventEmitter }         from '@angular/core';
import { Http, Response, Headers, RequestOptions }  from '@angular/http';
import { Observable }                               from 'rxjs/Observable';
import { Observer }                                 from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { BehaviorSubject }                          from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginService {
    status: Observable<boolean>;
    private observer: Observer<boolean>;
    public token: string;
    private authAPIUrl = 'http://localhost:8000/api-token-auth/';
    private headers = new Headers ({'Content-type': 'application/json', 'Accept': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http){
        this.status = new Observable<boolean>(observer =>
            this.observer = observer
        ).share();
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    changeState(newState: boolean){
        if ( this.observer !== undefined ) {
            this.observer.next(newState);
        }
    }

    login(username: string, password: string){
        return this.http.post(this.authAPIUrl, JSON.stringify({ username: username, password: password }), { headers: this.headers })
        .map((response: Response) => {
            // login successful if there's a JWT token in the response
            let token = response.json() && response.json().token;
            if (token) {
                this.changeState(true);
                // set token property
                this.token = token;

                // store username and jwt token in local storage to keep user logged in 
                // during page refreshes
                localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
                // successful login
            } else {
            }
        });
    }

    logout(): void {
        this.changeState(false);
        this.token = null;
        localStorage.removeItem('currentUser');
        // window.location.replace('/login');
    }
}
