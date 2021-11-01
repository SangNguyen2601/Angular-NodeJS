"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Inversify user for abstract class
const inversify_config_1 = require("../config/inversify.config");
const type_1 = require("../config/type");
const auth_middleware_1 = require("../middleware/auth.middleware");
const auth = new auth_middleware_1.AuthenToken();
class BooksRoutes {
    constructor() {
        this.bookControll = inversify_config_1.BookContainer.get(type_1.TYPES.ICRUD);
    }
    routes(app) {
        app.route('/books')
            //Get list book of user
            .get(auth.checkAuthToken, this.bookControll.getAll)
            //delete All books
            .delete(auth.checkAuthToken, this.bookControll.deleteAll);
        app.route('/book')
            //create new book
            .post(auth.checkAuthToken, this.bookControll.create)
            // get detail ONE book
            .get(auth.checkAuthToken, this.bookControll.getDetail)
            //update
            .put(auth.checkAuthToken, this.bookControll.update)
            //delete ONE book
            .delete(auth.checkAuthToken, this.bookControll.delete);
    }
}
exports.BooksRoutes = BooksRoutes;
//# sourceMappingURL=book.routes.js.map