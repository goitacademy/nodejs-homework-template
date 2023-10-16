const { Schema, model } = require("mongoose");
const Joi = require("joi");


const { handleMongooseError } = require("../helpers")

const contactSchema = new Schema ({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  })

  
  contactSchema.post("save", handleMongooseError);
  
  const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  
  const Contact = model("contact", contactSchema);

  const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
  })

  const schemas = {
	addSchema,
	updateFavoriteSchema,
  }


  module.exports = {
	  Contact,
	  schemas,
};