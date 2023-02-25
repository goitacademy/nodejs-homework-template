const { Schema, model } = require("mongoose")
const { handleMongooseError } = require('../helpers');

const Joi = require("joi");

const contactsSchema = new Schema({
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
    }
},
);

contactsSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(6).max(10).required(),
  favorite: Joi.boolean(),
});


const updateByIdSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(6).max(10),
  favorite: Joi.boolean(),
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
  updateByIdSchema,
};

const Contact = model("contact", contactsSchema);

module.exports = {
    Contact,
  schemas,
};