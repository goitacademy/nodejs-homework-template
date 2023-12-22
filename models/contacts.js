const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleSaveErrors = require("../helpers/handleSaveErrors");
const emailRegexp = require("./emailRegexp");

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    email: {
        type: String,
        match: emailRegexp,
    },
    phone: {
        type: String,
        required: [true, "Set phone for contact"],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
},
    { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);
const Contact = model("contact", contactSchema);

const addSchema = Joi.object({
    name: Joi.string().min(2).alphanum().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    phone: Joi.number().integer().required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
};

module.exports = { schemas, Contact };


