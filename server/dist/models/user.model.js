"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;
exports.User = new Schema({
    local: {
        salt: String,
        email: {
            type: String,
            trim: true,
            unique: 'email is already exits',
            match: [/.+\@.+\..+/, 'Please fill a valid email address'],
            sparse: true
        },
        hash_password: {
            type: String
        }
    },
    google: {
        email: {
            type: String,
            trim: true,
            sparse: true
        }
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
});
exports.User
    .virtual('local.password')
    .set(function (password) {
    this.local._password = password;
    this.local.salt = this.makeSalt();
    this.local.hash_password = this.encrypassword(password);
})
    .get(function () {
    return this.local._password;
});
exports.User.path('local.hash_password').validate(function (v) {
    if (this.local._password && this.local._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if (this.isNew && !this.local._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);
exports.User.methods = {
    encrypassword: function (password) {
        if (!password) {
            return '';
        }
        try {
            return crypto
                .createHmac('sha1', this.local.salt)
                .update(password)
                .digest('hex');
        }
        catch (err) {
            return '';
        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },
    authanticate: function (plaitext) {
        return this.encrypassword(plaitext) === this.local.hash_password;
    }
};
//# sourceMappingURL=user.model.js.map