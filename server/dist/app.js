"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const inversify_config_1 = require("./config/inversify.config");
const type_1 = require("./config/type");
const user_routes_1 = require("./routes/user.routes");
const book_routes_1 = require("./routes/book.routes");
const dotenv = require("dotenv");
const cors = require("cors");
//read .env
dotenv.config();
class App {
    constructor() {
        this.dbConnect = inversify_config_1.DBContainer.get(type_1.TYPES.DBConnect);
        this.userRoute = new user_routes_1.UserRoutes();
        this.booksRoute = new book_routes_1.BooksRoutes();
        this.app = express();
        ////////////
        this.dbConnect.getConnect();
        ///////////
        this.config();
        //add routes
        this.userRoute.routes(this.app);
        this.booksRoute.routes(this.app);
    }
    config() {
        this.app.use(cors());
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //user passport for gglogin
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map