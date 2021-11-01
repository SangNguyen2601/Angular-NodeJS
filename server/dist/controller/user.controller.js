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
const user_service_1 = require("../service/user.service");
const acl_helper_1 = require("../helper/acl.helper");
const type_1 = require("../config/type");
const inversify_config_1 = require("../config/inversify.config");
const ACL = new acl_helper_1.AclClass();
const userService = new user_service_1.UserService();
let UserController = class UserController {
    //why "cannot read property of underfined" ?????????
    //@inject(TYPES.IService) userService : IService
    //login local
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const local_email = req.body.email;
            const password = req.body.password;
            const result = yield userService.findOne(local_email);
            if (!result) {
                return res.status(200).json({
                    data: {},
                    message: "Email or password not match with system!",
                    success: false
                });
            }
            if (!result.authanticate(password)) {
                return res.status(200).json({
                    data: {},
                    message: " Email or password incorrect!",
                    success: false
                });
            }
            // when success login
            const acl = ACL.getAcl;
            acl.hasRole(result._id.toString(), 'admin', (err, bool) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (bool) {
                        const token = inversify_config_1.TokenContainer.get(type_1.TYPES.jwtService).signToken({ _id: result._id, isAdmin: bool });
                        return res.status('200').json({
                            data: {
                                token: token,
                                firstName: result.firstName,
                                lastName: result.lastName
                            },
                            message: "Đăng nhập thành công!",
                            success: true
                        });
                    }
                    else {
                        acl.hasRole(result._id.toString(), 'user', (err, bool) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                const token = inversify_config_1.TokenContainer.get(type_1.TYPES.jwtService).signToken({ _id: result._id, isUser: bool });
                                return res.status('200').json({
                                    data: {
                                        token: token,
                                        firstName: result.firstName,
                                        lastName: result.lastName
                                    },
                                    message: "Đăng nhập thành công!",
                                    success: true
                                });
                            }
                        });
                    }
                }
            });
        });
    }
    //log out
    logout(req, res) {
    }
    //Create user
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.isGG == 'isGG') {
                const checkGG = yield userService.findOneGG(req.body.email);
                if (checkGG) {
                    // when success login
                    const acl = ACL.getAcl;
                    acl.addUserRoles(checkGG._id.toString(), 'user', (err) => {
                        if (err) {
                            return res.status(200).json({
                                message: err,
                                success: false
                            });
                        }
                    });
                    acl.hasRole(checkGG._id.toString(), 'user', (err, bool) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            const token = inversify_config_1.TokenContainer.get(type_1.TYPES.jwtService).signToken({ _id: checkGG._id, isUser: bool });
                            return res.status('200').json({
                                data: {
                                    token: token,
                                    firstName: checkGG.firstName,
                                    lastName: checkGG.lastName
                                },
                                message: "Đăng nhập thành công!",
                                success: true
                            });
                        }
                    });
                }
                else {
                    const data = req.body;
                    const result = yield userService.createGG(data);
                    // when success login
                    const acl = ACL.getAcl;
                    acl.addUserRoles(result._id.toString(), 'user', (err) => {
                        if (err) {
                            return res.status(200).json({
                                message: err,
                                success: false
                            });
                        }
                    });
                    acl.hasRole(result._id.toString(), 'user', (err, bool) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            const token = inversify_config_1.TokenContainer.get(type_1.TYPES.jwtService).signToken({ _id: result._id, isUser: bool });
                            return res.status('200').json({
                                data: {
                                    token: token,
                                    firstName: result.firstName,
                                    lastName: result.lastName
                                },
                                message: "Đăng nhập thành công!",
                                success: true
                            });
                        }
                    });
                }
            }
            else {
                const check = yield userService.findOne(req.body.email);
                if (check) {
                    return res.status(200).json({
                        message: "Email has already exist!",
                        success: false
                    });
                }
                else {
                    const data = req.body;
                    const result = yield userService.create(data);
                    if (result) {
                        const acl = ACL.getAcl;
                        //console.log(acl);
                        acl.addUserRoles(result._id.toString(), 'user', (err) => {
                            if (err) {
                                return res.status(200).json({
                                    message: err,
                                    success: false
                                });
                            }
                        });
                        return res.status(200).json({
                            message: "Create account successfull!",
                            success: true
                        });
                    }
                    else {
                        return res.status(200).json({
                            message: "Create account failse!",
                            success: true
                        });
                    }
                }
            }
        });
    }
    //Get profile
    getDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.decoded._id;
            const result = yield userService.findByID(id);
            if (result) {
                return res.status(200).json({
                    data: result,
                    message: "Get profile success!",
                    success: true
                });
            }
            else {
                return res.status(403).json({
                    message: "Session expired !",
                    success: false
                });
            }
        });
    }
    //Get list user
    getAll(req, res) {
    }
    //Edit user
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = req.body;
            data._id = req.decoded._id;
            const result = yield userService.findAndUpdate(data);
            if (result) {
                return res.status(200).json({
                    data: result,
                    message: 'Update success !',
                    success: true
                });
            }
            else {
                return res.status(403).json({
                    data: result,
                    message: 'Session expired !',
                    success: true
                });
            }
        });
    }
    //Delete user
    delete(req, res) {
    }
    //Delete all
    deleteAll(req, res) {
    }
};
UserController = __decorate([
    inversify_1.injectable()
], UserController);
exports.UserController = UserController;
;
//# sourceMappingURL=user.controller.js.map