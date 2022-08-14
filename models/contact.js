const {Schema, model} = require("mongoose");

const Joi = require('joi');

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
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
        ref: "user",
    }
     
     
}, {versionKey: false, timestamps: true})

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),     
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

const schemas = {
    add: addSchema,
    updateFavorite: updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);
// categories => category
// mice => mouse

module.exports = {    
    Contact,
    schemas,
};