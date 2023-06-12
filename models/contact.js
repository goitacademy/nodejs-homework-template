const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
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

const dataValidator = (data) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().required(),
      phone: Joi.string().min(5).max(15).required(),
      favorite: Joi.bool(),
    });
  
    return schema.validate(data);
  };

const Contact = model("contact", contactSchema);

module.exports = {Contact, dataValidator};
