"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const book_service_1 = require("../service/book.service");
const bookService = new book_service_1.BookService();
let BookController = class BookController {
    //Add new books
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = req.body;
            data._id = req.decoded._id;
            const checkBook = yield bookService.findOne(data);
            if (checkBook) {
                return res.status(200).json({
                    message: "Book has already exist!",
                    success: false
                });
            }
            const result = yield bookService.create(data);
            if (result) {
                return res.status(200).json({
                    data: result,
                    message: "Add success!",
                    success: true
                });
            }
            else {
                return res.status(200).json({
                    message: "Add failse!",
                    success: false
                });
            }
        });
    }
    //Get list books of user
    //will edit if have admin permision
    //this's test version
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = req.decoded._id;
            const result = yield bookService.find(data);
            if (result) {
                return res.status(200).json({
                    data: result,
                    message: "Success!",
                    success: true
                });
            }
            else {
                return res.status(403).json({
                    data: result,
                    message: "Session expired !",
                    success: false
                });
            }
        });
    }
    //Get detail ONE book
    getDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body._id;
            const result = yield bookService.findByID(id);
            if (result) {
                return res.status(200).json({
                    data: result,
                    message: "Success!",
                    success: true
                });
            }
            else {
                return res.status(404).json({
                    message: "Not exist !",
                    success: false
                });
            }
        });
    }
    //Edit content
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = req.body;
            data.createBy = req.decoded._id;
            const result = yield bookService.findAndUpdate(data);
            if (result) {
                return res.status(200).json({
                    data: result,
                    message: 'Update success !',
                    success: true
                });
            }
            else {
                return res.status(200).json({
                    data: result,
                    message: 'Update failse !',
                    success: true
                });
            }
        });
    }
    //Delete ONE book
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body._id;
            const result = yield bookService.findAndDelete(id);
            return res.status(200).json({
                result
            });
        });
    }
    //Delete all book of user
    deleteAll(req, res) {
    }
};
BookController = __decorate([
    inversify_1.injectable()
], BookController);
exports.BookController = BookController;
;
//# sourceMappingURL=book.controller.js.map