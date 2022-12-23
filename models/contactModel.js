const { Schema, model } = require("mongoose")
const { handleMongooseError } = require('../helpers')

const Joi = require("joi")


const addContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().required()
})

const updateFieldFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

const contactSchema = new Schema({
    name: {
        type: String,
        minLength: 2,
        unique: true,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)

contactSchema.post("save", handleMongooseError)

contactSchema.requiredPaths()

const Contact = model("contact", contactSchema)

const schemas = {
    addContactSchema,
    updateFieldFavoriteSchema
}

module.exports = {
    Contact, schemas
}