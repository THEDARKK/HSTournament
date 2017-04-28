import { Injectable }                               from '@angular/core';
import { Http, Response, Headers, RequestOptions }  from '@angular/http';
import { Observable }                               from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
    public token: string;
    private authAPIUrl = 'http://localhost:8000/api-token-auth/';
    private headers = new Headers ({'Content-type': 'application/json', 'Accept': 'application/json'});
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http){
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post(this.authAPIUrl, JSON.stringify({ username: username, password: password }), { headers: this.headers })
        .map((response: Response) => {
            // login successful if there's a JWT token in the response
            let token = response.json() && response.json().token;
            if (token) {
                // set token property
                this.token = token;

                // store username and jwt token in local storage to keep user logged in 
                // during page refreshes
                localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
                // successful login
                return true;
            } else {
                // not successful
                return false;
            }
        });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
