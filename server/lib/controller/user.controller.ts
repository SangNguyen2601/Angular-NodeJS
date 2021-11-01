import { ICRUD } from './crud';
import { ILogInOut } from './login-out';
import { injectable, inject } from 'inversify';
import { UserService } from '../service/user.service';
import { AclClass } from '../helper/acl.helper';
import { TYPES } from '../config/type';
import { TokenContainer } from '../config/inversify.config';
import { jwtService } from '../middleware/jwt';
import { IService } from 'service/index.service';

const ACL = new AclClass();
const userService = new UserService();

@injectable()
export class UserController implements ICRUD, ILogInOut{
    //why "cannot read property of underfined" ?????????
    //@inject(TYPES.IService) userService : IService

    //login local
    public async login(req, res){
        const local_email = req.body.email;
        const password = req.body.password;

        const result = await userService.findOne(local_email);
        if (!result) {
            return res.status(200).json({
                data: {},
                message: "Email or password not match with system!",
                success: false
            })
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
            else{
                if(bool){
                    const token = TokenContainer.get<jwtService>(TYPES.jwtService).signToken({ _id: result._id, isAdmin: bool});
                    
                    return res.status('200').json({
                        data: {
                            token: token,
                            firstName : result.firstName,
                            lastName : result.lastName
                        },
                        message: "Đăng nhập thành công!",
                        success: true
                    })
                }
                else{
                    acl.hasRole(result._id.toString(), 'user', (err, bool) => {
                        if(err){
                            console.log(err)
                        }
                        else{
                            const token = TokenContainer.get<jwtService>(TYPES.jwtService).signToken({ _id: result._id, isUser: bool});
                            
                            return res.status('200').json({
                                data: {
                                    token: token,
                                    firstName : result.firstName,
                                    lastName : result.lastName
                                },
                                message: "Đăng nhập thành công!",
                                success: true
                            })
                        }
                    });
                }
            }

        });
    }
    //log out
    public logout(req, res){

    }
    //Create user
    public async create(req, res){
        if(req.body.isGG == 'isGG'){
            const checkGG = await userService.findOneGG(req.body.email)
            if(checkGG){
                // when success login
                const acl = ACL.getAcl;
                acl.addUserRoles(checkGG._id.toString(), 'user', (err) => {
                    if (err) {
                        return res.status(200).json({
                            message: err,
                            success: false
                        })
                    }
                })
                acl.hasRole(checkGG._id.toString(), 'user', (err, bool) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        const token = TokenContainer.get<jwtService>(TYPES.jwtService).signToken({ _id: checkGG._id, isUser: bool});
                                    
                        return res.status('200').json({
                            data: {
                                token: token,
                                firstName : checkGG.firstName,
                                lastName : checkGG.lastName
                            },
                            message: "Đăng nhập thành công!",
                            success: true
                        })
                    }
                });
            }
            else{
                const data = req.body;
                const result = await userService.createGG(data);
                // when success login
                const acl = ACL.getAcl;
                acl.addUserRoles(result._id.toString(), 'user', (err) => {
                    if (err) {
                        return res.status(200).json({
                            message: err,
                            success: false
                        })
                    }
                })
                acl.hasRole(result._id.toString(), 'user', (err, bool) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        const token = TokenContainer.get<jwtService>(TYPES.jwtService).signToken({ _id: result._id, isUser: bool});
                                                    
                        return res.status('200').json({
                            data: {
                                token: token,
                                firstName : result.firstName,
                                lastName : result.lastName
                            },
                            message: "Đăng nhập thành công!",
                            success: true
                        })
                    }
                });
            }
        }
        else{
            const check = await userService.findOne(req.body.email);
            if(check){
                return res.status(200).json({
                    message: "Email has already exist!",
                    success: false
                })
            }
            else{
                const data = req.body;
                const result = await userService.create(data);
                if(result){
                    const acl = ACL.getAcl;
                    //console.log(acl);
                    acl.addUserRoles(result._id.toString(), 'user', (err) => {
                        if (err) {
                            return res.status(200).json({
                                message: err,
                                success: false
                            })
                        }
                    })
                    return res.status(200).json({
                        message: "Create account successfull!",
                        success: true
                    })
                }else{
                    return res.status(200).json({
                        message: "Create account failse!",
                        success: true
                    })
                }
            }
        }
    }
    //Get profile
    public async getDetail(req, res){
        const id = req.decoded._id;
        const result = await userService.findByID(id);
        if(result){
            return res.status(200).json({
                data: result,
                message: "Get profile success!",
                success: true
            })
        }else{
            return res.status(403).json({
                message: "Session expired !",
                success: false
            })
        }
    }
    //Get list user
    public getAll(req, res){

    }
    //Edit user
    public async update(req, res){
        var data = req.body;
        data._id = req.decoded._id;

        const result = await userService.findAndUpdate(data);
        if(result){
            return res.status(200).json({
                data: result,
                message: 'Update success !',
                success: true
            });
        }else{
            return res.status(403).json({
                data: result,
                message: 'Session expired !',
                success: true
            });
        }
    }
    //Delete user
    public delete(req, res){

    }
    //Delete all
    public deleteAll(req, res){

    }
};