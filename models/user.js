
const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../helpers");


const userSchema = new Schema({
 
    email: {
        type: String,
        unique: true,
       required: [true, 'Email is required'],
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Password is required'],
    },

    subscription: {
         type: String,
         enum: ["starter", "pro", "business"],
         default: "starter"
        },
    token: {
         type: String,
         default: null,
        },
    
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    subscription:Joi.string
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
})

const updateSubscribeSchema = Joi.object({
 
      subscription:Joi.valid().required(),

})

const schemas = {
    registerSchema,
    loginSchema,
    updateSubscribeSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}

