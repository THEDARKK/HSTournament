import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Tournament } from '../models/tournament.model';

@Injectable()
export class TournamentsService {
    private tournamentAPIUrl = 'http://localhost:8000/tournaments/';
    constructor(private http: Http){}

    getTournaments(): Promise<Tournament[]>{
        return this.http.get(this.tournamentAPIUrl)
        .toPromise()
        .then(response => response.json() as Tournament[])
        .catch(this.handleError);       
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
