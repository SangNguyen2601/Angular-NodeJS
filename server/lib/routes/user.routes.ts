import { UserContainer } from '../config/inversify.config';
import { TYPES } from '../config/type';
import { ICRUD } from '../controller/crud';
import { AuthenToken } from "../middleware/auth.middleware";
import { ILogInOut } from '../controller/login-out';
import { injectable } from "inversify";
import * as passport from "passport";

const auth = new AuthenToken();

@injectable()
export class UserRoutes {
    userControll = UserContainer.get<ICRUD>(TYPES.ICRUD);
    userLog = UserContainer.get<ILogInOut>(TYPES.ILogInOut);

    passportSetup =  require('../helper/passport.helper');

    public routes(app) : void{
        //Login
        app.route('/')
            .post(this.userLog.login)
        //Get all user
        app.route('/users')
            .get(auth.checkAuthToken, this.userControll.getAll);

        app.route('/user')
            //create new user
            .post(this.userControll.create)
            // get profile
            .get(auth.checkAuthToken,this.userControll.getDetail)
            //update
            .put(auth.checkAuthToken, this.userControll.update)
            //delete user
            .delete(auth.checkAuthToken, this.userControll.delete)
    }
}