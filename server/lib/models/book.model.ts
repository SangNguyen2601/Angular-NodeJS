import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const Books = new Schema({
    title: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    decription: {
        type: String,
        trim: true          
    },
    createBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
});