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
var login_service_1 = require("./services/login.service");
var AppComponent = (function () {
    function AppComponent(loginService) {
        this.loginService = loginService;
        this.loggedIn = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.currentUser);
        this.subscription = this.loginService.status.subscribe(function (status) {
            _this.loggedIn = status;
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubcribe();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css',],
        providers: [login_service_1.LoginService,],
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map