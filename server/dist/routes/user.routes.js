"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_config_1 = require("../config/inversify.config");
const type_1 = require("../config/type");
const auth_middleware_1 = require("../middleware/auth.middleware");
const inversify_1 = require("inversify");
const auth = new auth_middleware_1.AuthenToken();
let UserRoutes = class UserRoutes {
    constructor() {
        this.userControll = inversify_config_1.UserContainer.get(type_1.TYPES.ICRUD);
        this.userLog = inversify_config_1.UserContainer.get(type_1.TYPES.ILogInOut);
        this.passportSetup = require('../helper/passport.helper');
    }
    routes(app) {
        //Login
        app.route('/')
            .post(this.userLog.login);
        //Get all user
        app.route('/users')
            .get(auth.checkAuthToken, this.userControll.getAll);
        app.route('/user')
            //create new user
            .post(this.userControll.create)
            // get profile
            .get(auth.checkAuthToken, this.userControll.getDetail)
            //update
            .put(auth.checkAuthToken, this.userControll.update)
            //delete user
            .delete(auth.checkAuthToken, this.userControll.delete);
    }
};
UserRoutes = __decorate([
    inversify_1.injectable()
], UserRoutes);
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user.routes.js.map