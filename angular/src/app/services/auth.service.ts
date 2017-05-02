import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Http, Response, Headers, RequestOptions }  from '@angular/http';

@Injectable()
export class AuthService {
    
    private loggedIn = new Subject<boolean>();
    loggedIn$ = this.loggedIn.asObservable();
    private authAPIUrl = 'http://localhost:8000/api-token-auth/';
    private headers = new Headers ({'Content-type': 'application/json', 'Accept': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http){}

    login(username: string, password: string){
        return this.http.post(this.authAPIUrl,
                              JSON.stringify({username: username, password: password}),
                              {headers: this.headers})
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                if(token){
                    this.token = token;
                    localStorage.setItem('token', JSON.stringify({username: username, token: token}));
                    this.loggedIn.next(true);
                    return response;
                }
            })
    }

    logout(): void {
        localStorage.removeItem('token');
        this.loggedIn.next(false);
    }
}
