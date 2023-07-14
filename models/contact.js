const { Schema, model } = require("mongoose")
const {handleMongooseError} = require("../helpers")
const Joi = require('joi');

const phoneRegexp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const contactSchema = new Schema({
     name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
       required: [true, 'Set name for contact'],
    },
    phone: {
        type: String,
         match: phoneRegexp,
        required: [true, 'Set name for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
},
    { versionKey: false }
)
contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})
const schemas = {
    addSchema,
    updateFavoriteSchema,
}
const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};