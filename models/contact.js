const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^\S+@\S+\.\S+$/;
const phoneRegexp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, `Set name for contact`],
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
},
    { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().valid(emailRegexp).required(),
    phone: Joi.string().valid(phoneRegexp).required(),
  favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};