import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class TournamentsService {
    constructor(private http: Http){}

    getTournaments(){
        return this.http.get('http://localhost:8000/tournaments/')
            .map(res => res.json());
    }
}
