const { Schema, model } = require('mongoose')
const Joi = require('joi')
// const bcrypt = require('bcrypt')


const userSchema = Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        minlenght: 6
    }
}, { versionKey: false, timestamps: true })

// userSchema.methods.setPassword = function(password){
//  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
// }

const userJoiSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
})

const User = model('user', userSchema)

module.exports = {userJoiSchema, User}