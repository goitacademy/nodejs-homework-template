const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegexr = /^(\+3|)[0-9]{10,11}$/;

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        match: phoneRegexr,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });

const joiSchema = Joi.object({
  name: Joi.string().min(2).max(24).required(),
  email: Joi.string().min(4).max(64).required().email(),
  phone: Joi.string().min(6).max(24).required()
        .pattern(phoneRegexr),
  favorite: Joi.bool()
});

const statusJoiSchema = Joi.object({
    favorite: Joi.bool().required()
})

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    joiSchema,
    statusJoiSchema
};