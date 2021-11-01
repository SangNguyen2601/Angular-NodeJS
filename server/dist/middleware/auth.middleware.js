"use strict";
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
const token_middleware_1 = require("./token.middleware");
const inversify_config_1 = require("../config/inversify.config");
const type_1 = require("../config/type");
class AuthenToken {
    constructor() {
        this.checkAuthToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            //Get token in header
            let token = req.headers['x-access-token'] || req.headers['authorization'];
            if (token) {
                if (token.startsWith('Bearer ')) {
                    token = token.slice(7, token.length);
                }
                let jwt = new token_middleware_1.TokenService();
                var check = jwt.verifyToken(token);
                req.decoded = check;
                next();
            }
            else {
                return res.status(401).json({ message: 'error' });
            }
            //Test code
            // let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTk1MzNlOGI1M2FkYjBkN2M1ZWQ3YmIiLCJpc1VzZXIiOnsibG9jYWwiOnsiZW1haWwiOiJzYW5nMTIzQGdtYWlsLmNvbSIsInNhbHQiOiI3MjA5MTUwMzg0ODciLCJoYXNoX3Bhc3N3b3JkIjoiODg3NmQ5ZmE4ZWI1YWUzZDdiOGM3MGQ1OGMzNGMxMDI4YWQyZTk2YSJ9LCJfaWQiOiI1ZTk1MzNlOGI1M2FkYjBkN2M1ZWQ3YmIiLCJfX3YiOjB9LCJpYXQiOjE1ODY4MzY0NjMsImV4cCI6MTU4Njg0MDA2M30.B9rZNT0nvWMiVTWfhejp9zssfHAYOpZtu-dEDZuGj4dgVA08oxC1Flw-tvjLXr2v4I0zGfjlSOvrxc80uP5hbA";
            // let jwt = new TokenService()
            // var check = jwt.verifyToken(token);
            // req.decoded = check;
            // next();
        });
        this.callback = (req, res, next) => {
            const token = inversify_config_1.TokenContainer.get(type_1.TYPES.jwtService).signToken({ _id: req.user._id, isUser: true });
            console.log(token);
            return res.json({
                message: "Đăng nhập thành công !",
                data: {
                    token: token,
                    firstName: req.user.firstName,
                    lastName: req.user.lastName,
                },
                success: true
            });
        };
    }
}
exports.AuthenToken = AuthenToken;
//# sourceMappingURL=auth.middleware.js.map