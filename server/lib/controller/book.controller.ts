import {ICRUD} from './crud';
import {injectable, inject} from 'inversify';
import {BookService} from '../service/book.service';

const bookService = new BookService();

@injectable()
export class BookController implements ICRUD {
    // Add new books
    public async create(req, res){
        var data = req.body;
        data._id = req.decoded._id;
        const checkBook = await bookService.findOne(data);
        if (checkBook) {
            return res.status(404).json ({
                message: "Book has already exist!",
                success: false
            })
        }
        const result = await bookService.create(data);
        if (result) {
            return res.status(200).json ({
                data: result,
                message: "Add success!",
                success: true
            })
        } else {
            return res.status(403).json ({
                message: "Add failse!",
                success: false
            })
        }
    }
    /* Get list books of user
     will edit if have admin permision
     this's test version */
    public async getAll(req, res) {
        var data = req.decoded._id;
        const result = await bookService.find(data);
        if (result) {
            return res.status(200).json ({
                data: result,
                message: "Success!",
                success: true
            })
        } else {
            return res.status(403).json ({
                data: result,
                message: "Session expired !",
                success: false
            })
        }
    }
    // Get detail ONE book
    public async getDetail(req, res) {
        const id = req.body._id;
        const result = await bookService.findByID(id);
        if (result) {
            return res.status(200).json ({
                data : result,
                message: "Success!",
                success: true
            })
        } else {
            return res.status(404).json ({
                message: "Not exist !",
                success: false
            })
        }
    }
    // Edit content
    public async update(req, res) {
        var data = req.body
        data.createBy = req.decoded._id;
        const result = await bookService.findAndUpdate(data);
        if (result) {
            return res.status(200).json ({
                data: result,
                message: 'Update success !',
                success: true
            });
        } else {
            return res.status(503).json ({
                data: result,
                message: 'Update failse !',
                success: true
            });
        }
    }
    // Delete ONE book
    public async delete(req, res) {
        const id = req.body._id;
        const result = await bookService.findAndDelete(id);

        return res.status(200).json ({
            result
        });
    }
    // Delete all book of user
    public deleteAll(req, res){
        // TODO: Delete all of data. Get backup if nesessary.
    }
};