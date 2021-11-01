"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const type_1 = require("./type");
const token_service_1 = require("../middleware/token.service");
const mongoConnect_1 = require("../db/mongoConnect");
const user_controller_1 = require("../controller/user.controller");
//unbind to solve error: Ambiguous match found for serviceIdentifier
//Token
const TokenContainer = new inversify_1.Container();
exports.TokenContainer = TokenContainer;
TokenContainer.bind(type_1.TYPES.jwtService).to(token_service_1.TokenService);
//DB connect
const DBContainer = new inversify_1.Container();
exports.DBContainer = DBContainer;
DBContainer.bind(type_1.TYPES.DBConnect).to(mongoConnect_1.default);
//User
const UserContainer = new inversify_1.Container();
exports.UserContainer = UserContainer;
UserContainer.bind(type_1.TYPES.ICRUD).to(user_controller_1.default);
UserContainer.bind(type_1.TYPES.ILogInOut).to(user_controller_1.default);
//# sourceMappingURL=inversifi.config.js.map