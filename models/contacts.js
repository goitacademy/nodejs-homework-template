const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const Joi = require("joi");

const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
            match: [emailRegExp, "Please fill a valid email address"],
        },
        phone: {
            type: String,
            match: [phoneRegExp, "Please fill a valid phone number"],
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const contactsSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().pattern(emailRegExp).required().messages({
        "string.pattern.base": `Please fill a valid email address`,
    }),
    phone: Joi.string().pattern(phoneRegExp).required().messages({
        "string.pattern.base": `Please fill a valid phone number`,
    }),
    favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const joiContactsSchemas = {
    contactsSchema,
    favoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiContactsSchemas };
