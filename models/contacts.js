const Joi = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contacts = new Schema(
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
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = mongoose.model("contact", contacts);

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).max(22).required(),
});
const changeContactShema = Joi.object({
  name: Joi.string().alphanum().min(3).max(50),
  email: Joi.string().email(),
  phone: Joi.string().min(6).max(22),
}).or("name", "email", "phone");

module.exports = {
  Contact,
  putValidate: changeContactShema,
  postValidate: addContactSchema,
};
