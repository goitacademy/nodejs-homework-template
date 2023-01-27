const Joi = require("joi");
const { model, Schema } = require("mongoose");


const schema = new Schema({
  
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
  
})

const joi = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
    favorite: Joi.bool().required(),
  });

const joiFavorite = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contacts", schema);
module.exports = { Contact, joi, joiFavorite };