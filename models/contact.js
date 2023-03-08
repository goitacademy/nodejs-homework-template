const {Schema, model} = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

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
  });


contactSchema.post("save", handleMongooseError);

const postContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const putContactSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean(),
});

const patchContactSchema = Joi.object({
  favorite: Joi.boolean(),
});

const schemas = {
  postContactSchema,
  putContactSchema,
  patchContactSchema,
}

const Contact = model("contact", contactSchema);


module.exports = {
  Contact,
  schemas,
}