const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
        min: 3,
        max: 30,
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    phone: {
        type: String,
        required: [true, 'Set phone number for contact'],
        match: [/^(\(\d{3}\) )\d{3}-\d{4}$/, 'Please fill valid number in (XXX) XXX-XXXX format'],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
});

const contactJoiSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().regex(/^(\(\d{3}\) )\d{3}-\d{4}$/).required(),
    favorite: Joi.boolean(),
  });

const contactFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    contactJoiSchema,
    contactFavoriteSchema
}
