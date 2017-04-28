import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentComponent }  from './components/tournament.component';
import { AboutComponent }       from './components/about.component';
import { UserComponent }        from './components/user.component';
import { LoginComponent }       from './components/login.component';

const appRoutes: Routes = [
    {
        path:'',
        component: TournamentComponent
    },
    {
        path:'about',
        component: AboutComponent
    },
    {
        path:'users',
        component: UserComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'**',
        redirectTo: ''
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
