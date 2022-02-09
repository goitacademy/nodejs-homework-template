const Joi = require("joi");
const { Schema, model } = require("mongoose");
  
const joiSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const contactSchema = Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);
// "contact"-название коллекции в ед.числе(коллекция из db-contacts)

module.exports = { joiSchema, Contact };
