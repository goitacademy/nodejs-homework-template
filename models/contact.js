const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleValidationError } = require("../middlewares");

const Regexp = /^\d{3} \d{3}-\d{4}$/;

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required!"],
    },
    email: {
        type: String,
        required: [true, "email is required!"],
    },
    phone: {
        type: String,
        required: [true, "phone is required!"],
        match: Regexp,
        unique: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, { versionKey: false, timestamps: true });

 contactSchema.post("save", handleValidationError);

const reqBodySchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(Regexp).min(7).max(15).required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {
    reqBodySchema,
    updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};