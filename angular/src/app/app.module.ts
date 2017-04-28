import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }  from './app.component';
import { TournamentComponent } from './components/tournament.component';
import { AboutComponent } from './components/about.component';
import { UserComponent } from './components/user.component';
import { LoginComponent } from './components/login.component';

import { routing } from './app.routing';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, routing, NgbModule.forRoot() ],
    declarations: [ AppComponent,
                    TournamentComponent,
                    AboutComponent,
                    UserComponent,
                    LoginComponent],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
