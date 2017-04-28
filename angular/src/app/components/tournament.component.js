"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var tournaments_service_1 = require("../services/tournaments.service");
var TournamentComponent = (function () {
    function TournamentComponent(tournamentsService) {
        this.tournamentsService = tournamentsService;
    }
    TournamentComponent.prototype.getTournaments = function () {
        var _this = this;
        this.tournamentsService
            .getTournaments()
            .then(function (tournaments) { return _this.tournaments = tournaments; });
    };
    TournamentComponent.prototype.ngOnInit = function () {
        this.getTournaments();
    };
    return TournamentComponent;
}());
TournamentComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tournament',
        templateUrl: 'tournament.component.html',
        providers: [tournaments_service_1.TournamentsService]
    }),
    __metadata("design:paramtypes", [tournaments_service_1.TournamentsService])
], TournamentComponent);
exports.TournamentComponent = TournamentComponent;
//# sourceMappingURL=tournament.component.js.map