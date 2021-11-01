"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.Books = new Schema({
    title: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    decription: {
        type: String,
        trim: true
    },
    createBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
});
//# sourceMappingURL=book.model.js.map