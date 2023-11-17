// const { Schema, model} = require('mongoose');
// const { handleMongooseError } = require("../helpers");


// const userSchema = new Schema({

//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//   },
  
//   subscription: {
//     type: String,
//     enum: ["starter", "pro", "business"],
//     default: "starter"
//   },
//   token: {
//     type: String,
//     default: null,
//     },
  
// },{vesionKey:false,timestamps:true})

// userSchema.post('save', handleMongooseError)

// const User = model('user', userSchema);


// module.exports = User;


const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");



const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
      
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    }
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
})

const schemas = {
    registerSchema,
    loginSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}

