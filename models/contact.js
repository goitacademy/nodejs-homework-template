const {Schema, model} = require("mongoose")
const Joi = require("joi")


const contactSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, {versionKey: false, timestamps: true })

const add = Joi.object({
    name: Joi.string().required,
    email: Joi.string().required,
    phone: Joi.string().required,
    favorite: Joi.bool()
})

const updateFavorite = Joi.object({
    favorite: Joi.bool().required
})

const joiSchema = {
    add,
    updateFavorite
}

const Contact = model("contact", contactSchema)

module.exports = {
    Contact,
    joiSchema
}