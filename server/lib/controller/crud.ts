export interface ICRUD{
    create(req, res);
    getDetail(req, res);
    getAll(req, res);
    update(req, res);
    delete(req, res);
    deleteAll(req, res);
}