import * as mongoose from 'mongoose';
import { Books } from '../models/book.model';
import { IService } from './index.service';
import { injectable } from 'inversify';

const Bookmodel = mongoose.model('Book', Books);

@injectable()
export class BookService implements IService{
    public create(data){
        const newBook = new Bookmodel(
            {
                title: data.title,
                category: data.category,
                decription: data.decription,
                createBy: data._id
            }
        );
        return newBook.save()
                .then((result) => {
                    return result;
                }).catch((err) => {
                    console.log(err);
                });
    }

    public find(data){
        return Bookmodel
                .find({
                    "createBy": data
                })
                .then((result) => {
                    return result
                }).catch((err) => {
                    console.log(err);
                });
    }

    public findOne(data){
        return Bookmodel
                .findOne(
                    {
                        "title": data.title,
                        "createBy": data._id
                    }
                )
                .then((result) => {
                    return result
                }).catch((err) => {
                    console.log(err)
                });
    }

    public findByID(id){
        return Bookmodel
                .findById(id)
                .then((result) => {
                    return result;
                }).catch((err) => {
                    console.log(err);
                });
    }

    public findAndUpdate(data){
        return Bookmodel
                .findOne({
                    "_id" : data._id,
                    "createBy": data.createBy
                })
                .then((result) => {
                    if(!result) return;
                    
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

    public findAndDelete(id){
        return Bookmodel
                .findOneAndDelete({
                    "_id": id
                })
                .then((result) => {
                    return {
                        message: "Delete successfull !",
                        success: true
                    }
                }).catch((err) => {
                    console.log(err)
                });
    }

    public deleteAll(){
        
    }
}