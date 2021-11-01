import * as mongoose from 'mongoose';
import {acl_config} from '../config/acl_config';
import { DBConnect } from './indexConnection';
import { injectable } from 'inversify';

@injectable()
export class MongoConnect implements DBConnect{
    
    public mongoUrl : string = process.env.MONGOOSE_URL;
    //public mongoUrl : string = "mongodb://localhost:27017/bookStore";
    
    public getConnect(){
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
                .then(() => {
                    new acl_config(mongoose.connection.db);
                    console.log("Mongooes connect successfull !");
                }).catch((err) => {
                    console.log(err);
                });
    }
};