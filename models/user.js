const {Schema, model} = require('mongoose')
const {handleMongooseError} = require('../helpers')

const Joi = require('joi')

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
        password: {
          type: String,
          required: [true, 'Password is required'],
          minlength: 6,
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
          match: emailRegexp,
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

      
}, {versionKey: false, timestamps: true})

userSchema.post('save', handleMongooseError)

const registerAndLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
})

const schemas = {
    registerAndLoginSchema,
}

const User = model('user', userSchema);

module.exports = {
    User,
    schemas,
}