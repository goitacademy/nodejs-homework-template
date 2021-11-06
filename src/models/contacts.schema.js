   
const { Schema, Types, model} = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    email: {
        type: String,
        required: [true, "Please fill in the email field"],
    },
    phone: {
        type: String,
        required: [true, "Please fill in the phone field"],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Types.ObjectId,
        ref: 'users.schema',
      }

}, { versionKey: false, timestamps: true });

const joiContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$')),
    favorite: Boolean
})

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    joiContactSchema
};  