import { Component } from '@angular/core';
import { TournamentsService } from '../services/tournaments.service';

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: 'user.component.html',
    providers: [TournamentsService]
})

export class UserComponent{ 
    name: string;
    email: string;
    address: address;
    hobbies: string[];
    showHobbies: boolean;
    tournaments: Tournament[];
    
    constructor(private tournamentsService: TournamentsService){
        this.name = 'John Doe';
        this.email = 'john@gmail.com';
        this.address = {
            street: '12 Main st',
            city: 'Boston',
            state: 'MA'
        }
        this.hobbies = ['Music', 'Movies', 'Sports'];
        this.showHobbies = false;

        this.tournamentsService.getTournaments().subscribe(tournaments => {
            this.tournaments = tournaments;
        });
    }

    toggleHobbies(){
        if ( this.showHobbies ){
            this.showHobbies = false;
        } else {
            this.showHobbies = true;
        }    
    }

    addHobby(hobby:string){
        this.hobbies.push(hobby);
    }

    deleteHobby(i:number){
        this.hobbies.splice(i, 1);
    }
}

interface address {
    street: string;
    city: string;
    state: string;
}

interface Tournament {
    id: number;
    active: boolean;
    name: string;
    max_players: number;
    start_time: string;
    end_time: string;
}
