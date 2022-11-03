const {Schema, model} = require('mongoose')
const Joi = require('joi')
const onSaveErrors = require('../helpers/onSaveErrors')

const subscriptionArray = ["starter", "pro", "business"]

const usersSchema = new Schema({
        password: {
          type: String,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: subscriptionArray,
          default: "starter"
        },
        token: String
      
    }, {versionKey: false, timestamps: true})
    usersSchema.post("save", onSaveErrors);

const validateRegisterSchema = Joi.object({
    email: Joi.string().required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required(),
    subscription: Joi.string().valid(...subscriptionArray)
})    

const User = model('user',usersSchema)

const schemas = {
    validateRegisterSchema
}

module.exports = {
    User,
    schemas
}