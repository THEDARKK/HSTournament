import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: 'user.component.html',
    providers: [UserService]
})

export class UserComponent implements OnInit {
    users: User[];

    constructor(private userService: UserService){}

    getUsers(): void {
        this.userService
            .getUsers()
            .then(users => this.users = users);
    }

    ngOnInit(): void {
        this.getUsers();
    }
}
