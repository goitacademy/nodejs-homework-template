const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        require: true,
        match: /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    },
    phone: {
        type: String,
        require: true,
        match: /^[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}$/,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true }); 

const contactJoiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool(),
})

const Contact = model("contact", contactSchema);

module.exports = { Contact, contactJoiSchema};