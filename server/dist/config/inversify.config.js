"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const type_1 = require("./type");
const token_middleware_1 = require("../middleware/token.middleware");
const mongoConnect_1 = require("../db/mongoConnect");
const user_controller_1 = require("../controller/user.controller");
const book_controller_1 = require("../controller/book.controller");
const user_service_1 = require("../service/user.service");
const book_service_1 = require("../service/book.service");
//unbind to solve error: Ambiguous match found for serviceIdentifier
//Token
const TokenContainer = new inversify_1.Container();
exports.TokenContainer = TokenContainer;
TokenContainer.bind(type_1.TYPES.jwtService).to(token_middleware_1.TokenService);
//DB connect
const DBContainer = new inversify_1.Container();
exports.DBContainer = DBContainer;
DBContainer.bind(type_1.TYPES.DBConnect).to(mongoConnect_1.MongoConnect);
//User
const UserContainer = new inversify_1.Container();
exports.UserContainer = UserContainer;
UserContainer.bind(type_1.TYPES.ICRUD).to(user_controller_1.UserController);
UserContainer.bind(type_1.TYPES.ILogInOut).to(user_controller_1.UserController);
UserContainer.bind(type_1.TYPES.IService).to(user_service_1.UserService);
//Book
const BookContainer = new inversify_1.Container();
exports.BookContainer = BookContainer;
BookContainer.bind(type_1.TYPES.ICRUD).to(book_controller_1.BookController);
BookContainer.bind(type_1.TYPES.IService).to(book_service_1.BookService);
//# sourceMappingURL=inversify.config.js.map