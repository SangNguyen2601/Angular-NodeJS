"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_model_1 = require("../models/user.model");
const inversify_1 = require("inversify");
const Usermodel = mongoose.model('User', user_model_1.User);
let UserService = class UserService {
    create(data) {
        const newUser = new Usermodel({
            local: {
                email: data.email,
                password: data.password
            },
            firstName: data.firstName,
            lastName: data.lastName
        });
        return newUser.save()
            .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
    find(data) {
    }
    findOne(email) {
        return Usermodel
            .findOne({
            "local.email": email
        })
            .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
    findByID(id) {
        return Usermodel
            .findById(id)
            .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
    findAndUpdate(data) {
        return Usermodel
            .findById(data._id)
            .then((result) => {
            if (!result)
                return;
            result.firstname = data.firstname;
            result.lastname = data.lastname;
            return result.save()
                .then((rs) => {
                return rs;
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    findAndDelete(id) {
    }
    deleteAll() {
    }
    createGG(data) {
        const user = new Usermodel({
            google: {
                email: data.email,
            },
            firstName: data.firstName,
            lastName: data.lastName,
        });
        return user.save()
            .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
    findOneGG(email) {
        return Usermodel
            .findOne({
            "google.email": email
        })
            .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
};
UserService = __decorate([
    inversify_1.injectable()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map