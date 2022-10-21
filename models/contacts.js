const { Schema, model } = require("mongoose");
const handleSaveErrors = require("../helpers/handleSaveErrors");
const Joi = require("joi");

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
        unique: true,

    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, { versionKey: false, timestamps: true });

const Contact = model("contact", contactSchema);

contactSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
};

module.exports = {
    Contact,
    schemas,
};