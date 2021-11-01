export interface IService{
    create(data: any);
    find(data: any);
    findOne(data: any);
    findByID(data: any);
    findAndUpdate(data: any);
    findAndDelete(data: any);
    deleteAll(data: any);
}