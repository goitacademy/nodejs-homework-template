/* eslint-disable no-useless-escape */
/* eslint-disable no-tabs */
const { Schema, model } = require('mongoose')
const Joi = require('joi')

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneNumberRegexp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        match: emailRegexp
    },
    phone: {
        type: String,
        match: phoneNumberRegexp
    },
    favorite: {
        type: Boolean,
        default: false,
    },
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		}
}, { versionKey: false, timestamp: true })

const post = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    email: Joi.string().pattern(emailRegexp),
    phone: Joi.string().pattern(phoneNumberRegexp).required(),
    favorite: Joi.boolean()

})

const put = Joi.object({
    name: Joi.string().min(2).max(40),
    email: Joi.string().pattern(emailRegexp),
    phone: Joi.string().pattern(phoneNumberRegexp),
    favorite: Joi.boolean()

})

const Contact = model('contact', contactSchema)

module.exports = {
    Contact,
    post,
    put
}
