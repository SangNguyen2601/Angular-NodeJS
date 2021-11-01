//Inversify user for abstract class
import { BookContainer } from '../config/inversify.config';
import { TYPES } from '../config/type';
import { ICRUD } from '../controller/crud';
import { AuthenToken } from "../middleware/auth.middleware";

const auth = new AuthenToken();

export class BooksRoutes {

    bookControll = BookContainer.get<ICRUD>(TYPES.ICRUD);

    public routes(app) : void{
        
        app.route('/books')
            //Get list book of user
            .get(auth.checkAuthToken, this.bookControll.getAll)
            //delete All books
            .delete(auth.checkAuthToken, this.bookControll.deleteAll)

        app.route('/book')
            //create new book
            .post(auth.checkAuthToken, this.bookControll.create)
            // get detail ONE book
            .get(auth.checkAuthToken,this.bookControll.getDetail)
            //update
            .put(auth.checkAuthToken, this.bookControll.update)
            //delete ONE book
            .delete(auth.checkAuthToken, this.bookControll.delete)

    }
}