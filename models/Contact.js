const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSaveError, runValidateUpdate } = require('./hooks');

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
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
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, { versionKey: false, timestamps: true });

contactSchema.post("save", handleSaveError);

contactSchema.pre("fineOneAndUpdate", runValidateUpdate);

contactSchema.post("fineOneAndUpdate", handleSaveError)

const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `"name" must be exist`
    }),
    phone: Joi.string().required(),
    email: Joi.string().required(),
    favorite: Joi.boolean(),
})

const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const Contact = model("contact", contactSchema);

module.exports = { Contact, contactAddSchema, contactUpdateFavoriteSchema };