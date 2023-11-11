const mongoose = require("mongoose");
const Joi = require('joi');
const { handleMongooseError } = require("../HttpErrors");

const conctactSchema = new mongoose.Schema(
{
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
  }
)
contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const changeFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("Contact", conctactSchema);
const schemas = { addSchema, changeFavoriteSchema };

module.exports = { Contact, schemas };
