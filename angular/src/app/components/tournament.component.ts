import { Component, OnInit } from '@angular/core';
import { TournamentsService } from '../services/tournaments.service';

import { Tournament } from '../models/tournament.model';

@Component({
    moduleId: module.id,
    selector: 'tournament',
    templateUrl: 'tournament.component.html',
    providers: [TournamentsService]
})

export class TournamentComponent implements OnInit { 
    tournaments: Tournament[];
    
    constructor(private tournamentsService: TournamentsService){}

    getTournaments(): void {
        this.tournamentsService
            .getTournaments()
            .then(tournaments => this.tournaments = tournaments);
    }

    ngOnInit(): void {
        this.getTournaments();
    }
}


