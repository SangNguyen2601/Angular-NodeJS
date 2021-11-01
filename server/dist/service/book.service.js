"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const book_model_1 = require("../models/book.model");
const inversify_1 = require("inversify");
const Bookmodel = mongoose.model('Book', book_model_1.Books);
let BookService = class BookService {
    create(data) {
        const newBook = new Bookmodel({
            title: data.title,
            category: data.category,
            decription: data.decription,
            createBy: data._id
        });
        return newBook.save()
            .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
    find(data) {
        return Bookmodel
            .find({
            "createBy": data
        })
            .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
    findOne(data) {
        return Bookmodel
            .findOne({
            "title": data.title,
            "createBy": data._id
        })
            .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
    findByID(id) {
        return Bookmodel
            .findById(id)
            .then((result) => {
            return result;
        }).catch((err) => {
            console.log(err);
        });
    }
    findAndUpdate(data) {
        return Bookmodel
            .findOne({
            "_id": data._id,
            "createBy": data.createBy
        })
            .then((result) => {
            if (!result)
                return;
            result.title = data.title;
            result.category = data.category;
            result.decription = data.decription;
            return result.save()
                .then((result) => {
                return result;
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }
    findAndDelete(id) {
        return Bookmodel
            .findOneAndDelete({
            "_id": id
        })
            .then((result) => {
            return {
                message: "Delete successfull !",
                success: true
            };
        }).catch((err) => {
            console.log(err);
        });
    }
    deleteAll() {
    }
};
BookService = __decorate([
    inversify_1.injectable()
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map