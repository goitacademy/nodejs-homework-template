const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

// crete object schema (keyword 'new' for ES6): 1st argument - object decription
// 2nd - 
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: /\w{0}[a-zA-Zа-яА-Я]+\@\w{0}[a-zA-Zа-яА-Я]+\.\w{0}[a-zA-Zа-яА-Я]/,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minLength: 8,
        required: true,
    },
    
},{
    versionKey: false // You should be aware of the outcome after set to false
});

userSchema.post("save", handleMongooseError);

// create model : 1st argument - collection name
const User = model('user', userSchema);

module.exports = User;