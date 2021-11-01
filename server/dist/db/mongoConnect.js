"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const acl_config_1 = require("../config/acl_config");
const inversify_1 = require("inversify");
let MongoConnect = class MongoConnect {
    constructor() {
        this.mongoUrl = process.env.MONGOOSE_URL;
    }
    //public mongoUrl : string = "mongodb://localhost:27017/bookStore";
    getConnect() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
            .then(() => {
            new acl_config_1.acl_config(mongoose.connection.db);
            console.log("Mongooes connect successfull !");
        }).catch((err) => {
            console.log(err);
        });
    }
};
MongoConnect = __decorate([
    inversify_1.injectable()
], MongoConnect);
exports.MongoConnect = MongoConnect;
;
//# sourceMappingURL=mongoConnect.js.map