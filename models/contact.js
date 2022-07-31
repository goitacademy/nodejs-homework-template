const {Schema, model} = require ("mongoose");
const Joi = require("joi");

const contactSchema = new Schema({
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: String,
        match: /[0-9]{3}-[0-9]{3}-[0-9]{4}/,
        required: true,
        unique: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, {versionKey:false, timestamps: true});

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().pattern(/[0-9]{3}-[0-9]{3}-[0-9]{4}/).required(),
    favorite: Joi.boolean(),
}) 
  
const contactUpdateFavorite = Joi.object({
    favorite: Joi.boolean().required()
})
  
const schemas = {
    add: contactAddSchema,
    updateFavorite: contactUpdateFavorite,
}
const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};