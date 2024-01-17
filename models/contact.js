const { Schema, model } = require("mongoose");
const Joi = require("joi");


const {handleMongooseError} = require("../helpers")

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
            required: [true, 'Email required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone required'],

        },
        favorite: {
            type: Boolean,
            default: false,
        },
    }
    
);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favourite: Joi.boolean()
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

contactSchema.post("save", handleMongooseError )

const Contact = model("contact", contactSchema)

const schemas = {
    addSchema,
    updateFavoriteSchema 
};


module.exports = { Contact, schemas };