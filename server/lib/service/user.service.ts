import * as mongoose from 'mongoose';
import { User } from '../models/user.model';
import { IService } from './index.service';
import { IGGService } from './gg.service';
import { injectable } from 'inversify';

const Usermodel = mongoose.model('User', User);

@injectable()
export class UserService implements IService, IGGService{
    public create(data){
        const newUser = new Usermodel(
            {
                local: {
                    email: data.email,
                    password: data.password
                },
                firstName: data.firstName,
                lastName: data.lastName
            }
        );
        return newUser.save()
                .then((result) => {
                    return result;
                }).catch((err) => {
                    console.log(err);
                });
    }

    public find(data){

    }

    public findOne(email){
        return Usermodel
                .findOne(
                    {
                        "local.email": email
                    }
                )
                .then((result) => {
                    return result
                }).catch((err) => {
                    console.log(err)
                });
                
    }

    public findByID(id){
        return Usermodel
                .findById(id)
                .then((result) => {
                    return result
                }).catch((err) => {
                    console.log(err);
                });
    }

    public findAndUpdate(data){
        return Usermodel
                .findById(data._id)
                .then((result) => {
                    if(!result) return;
                    
                    result.firstname = data.firstname;
                    result.lastname = data.lastname;
                    return result.save()
                            .then((rs) => {
                                return rs
                            }).catch((err) => {
                                console.log(err)
                            });
                }).catch((err) => {
                    console.log(err);
                });
    }

    public findAndDelete(id){

    }

    public deleteAll(){

    }

    public createGG(data){
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

    public findOneGG(email){
        return Usermodel
                .findOne(
                    {
                        "google.email": email
                    }
                )
                .then((result) => {
                    return result
                }).catch((err) => {
                    console.log(err)
                });
    }
}