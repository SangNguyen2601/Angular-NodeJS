import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import { DBContainer } from './config/inversify.config';
import { DBConnect } from './db/indexConnection';
import { TYPES } from './config/type';
import { UserRoutes } from './routes/user.routes';
import { BooksRoutes } from './routes/book.routes';
import * as dotenv from "dotenv";
import * as cors from "cors";

//read .env
dotenv.config();

class App{
    public app : express.Application;
    dbConnect = DBContainer.get<DBConnect>(TYPES.DBConnect);

    public userRoute : UserRoutes = new UserRoutes();
    public booksRoute : BooksRoutes = new BooksRoutes();

    constructor(){
        this.app = express();
        ////////////
        this.dbConnect.getConnect();
        ///////////
        this.config();
        //add routes
        this.userRoute.routes(this.app);
        this.booksRoute.routes(this.app);
        
    }

    private config(): void{
        this.app.use(cors());
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //user passport for gglogin
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
}
export default new App().app;