const {Schema, model} = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "missing required name field",
    }),
    email: Joi.string().required().messages({
        "any.required": "missing required email field",
    }),
    phone: Joi.string().required().regex(/^[(]\d{3}[)]\s\d{3}-\d{4}$/).messages({
        "any.required": "missing required phone field",
    }),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
        "any.required": "missing required favorite field",
    }),
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
