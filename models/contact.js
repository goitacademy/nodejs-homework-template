const {Schema, model} = require("mongoose");
const Joi = require("joi");

const codeRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const contactSchema = Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
        minlength: 3,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [codeRegex, "Please fill a valid email address"]
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        unique: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    }
}, { versionKey: false, timestamps: true });

const joiAddContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(codeRegex),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const joiUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);


module.exports = {
    Contact,
    schemas: {
        add: joiAddContactSchema,
        updateFavorite: joiUpdateFavoriteSchema,
    },
};