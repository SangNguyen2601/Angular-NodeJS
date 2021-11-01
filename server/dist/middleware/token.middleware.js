"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
const inversify_1 = require("inversify");
require("reflect-metadata");
// use 'utf8' to get string instead of byte array  (512 bit key)
const privateKEY = fs.readFileSync(path.resolve('lib/config/private.key'), 'utf8');
const publicKEY = fs.readFileSync(path.resolve('lib/config/publish.key'), 'utf8');
let TokenService = class TokenService {
    signToken(payload) {
        // Token signing options
        var signOptions = {
            expiresIn: "1h",
            algorithm: "RS256"
        };
        return jwt.sign(payload, privateKEY, signOptions);
    }
    verifyToken(token) {
        var verifyOptions = {
            expiresIn: "1h",
            algorithm: ["RS256"]
        };
        try {
            return jwt.verify(token, publicKEY, verifyOptions);
        }
        catch (err) {
            return "false";
        }
    }
    decode(token) {
        return jwt.decode(token, { complete: true });
        //returns null if token is invalid
    }
};
TokenService = __decorate([
    inversify_1.injectable()
], TokenService);
exports.TokenService = TokenService;
//# sourceMappingURL=token.middleware.js.map