const {Schema, model} = require("mongoose")
const Joi = require("joi")

const contactSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
},  {versionKey: false, timestamps: true}) 

const add = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
})

const updateFavorite = Joi.object({
    favorite: Joi.bool().required()
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