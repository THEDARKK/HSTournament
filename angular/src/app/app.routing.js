"use strict";
var router_1 = require("@angular/router");
var tournament_component_1 = require("./components/tournament.component");
var about_component_1 = require("./components/about.component");
var user_component_1 = require("./components/user.component");
var login_component_1 = require("./components/login.component");
var appRoutes = [
    {
        path: '',
        component: tournament_component_1.TournamentComponent
    },
    {
        path: 'about',
        component: about_component_1.AboutComponent
    },
    {
        path: 'users',
        component: user_component_1.UserComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map