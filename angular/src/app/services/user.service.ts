import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../models/user.model'; 

@Injectable()
export class UserService {
    private userAPIUrl = 'http://localhost:8000/players/';
    constructor(private http: Http){}

    getUsers(): Promise<User[]>{
        return this.http.get(this.userAPIUrl)
        .toPromise()
        .then(response => response.json() as User[]);
    }
}
