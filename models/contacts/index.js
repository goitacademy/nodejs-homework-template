const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require('../../helpers')

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
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co'] } }).required(),
  phone: Joi.string().required().min(3).max(30)
})

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
}