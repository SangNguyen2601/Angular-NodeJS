import { Container } from 'inversify';
import { TYPES } from './type';
import { jwtService } from '../middleware/jwt';
import { TokenService } from '../middleware/token.middleware';
import { DBConnect } from '../db/indexConnection';
import { MongoConnect } from '../db/mongoConnect';
import {ICRUD} from '../controller/crud';
import {ILogInOut} from '../controller/login-out';
import { UserController } from '../controller/user.controller';
import { BookController } from '../controller/book.controller';
import { IService } from '../service/index.service';
import { UserService } from '../service/user.service';
import { BookService } from '../service/book.service';

//unbind to solve error: Ambiguous match found for serviceIdentifier

//Token
const TokenContainer = new Container();
TokenContainer.bind<jwtService>(TYPES.jwtService).to(TokenService);

//DB connect
const DBContainer = new Container();
DBContainer.bind<DBConnect>(TYPES.DBConnect).to(MongoConnect);

//User
const UserContainer = new Container();
UserContainer.bind<ICRUD>(TYPES.ICRUD).to(UserController);
UserContainer.bind<ILogInOut>(TYPES.ILogInOut).to(UserController);
UserContainer.bind<IService>(TYPES.IService).to(UserService);

//Book
const BookContainer = new Container();
BookContainer.bind<ICRUD>(TYPES.ICRUD).to(BookController);
BookContainer.bind<IService>(TYPES.IService).to(BookService);

export {
    TokenContainer,
    DBContainer,
    UserContainer,
    BookContainer,
    
};