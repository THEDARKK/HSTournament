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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/share");
var LoginService = (function () {
    function LoginService(http) {
        var _this = this;
        this.http = http;
        this.authAPIUrl = 'http://localhost:8000/api-token-auth/';
        this.headers = new http_1.Headers({ 'Content-type': 'application/json', 'Accept': 'application/json' });
        this.options = new http_1.RequestOptions({ headers: this.headers });
        this.status = new Observable_1.Observable(function (observer) {
            return _this.observer = observer;
        }).share();
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    LoginService.prototype.changeState = function (newState) {
        if (this.observer !== undefined) {
            this.observer.next(newState);
        }
    };
    LoginService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post(this.authAPIUrl, JSON.stringify({ username: username, password: password }), { headers: this.headers })
            .map(function (response) {
            // login successful if there's a JWT token in the response
            var token = response.json() && response.json().token;
            if (token) {
                _this.changeState(true);
                // set token property
                _this.token = token;
                // store username and jwt token in local storage to keep user logged in 
                // during page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
            }
            else {
            }
        });
    };
    LoginService.prototype.logout = function () {
        this.changeState(false);
        this.token = null;
        localStorage.removeItem('currentUser');
        // window.location.replace('/login');
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map