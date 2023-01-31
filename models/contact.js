const { Schema, model } = require("mongoose");

const Joi = require("joi");
const handleErrors = require("../helpers/handleMongooseErr");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiContact = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).required(),
  favorite: Joi.bool(),
});

const joiStatus = Joi.object({
  favorite: Joi.bool().required(),
});

contactSchema.post("save", handleErrors);

const Contact = model("contact", contactSchema);

const schemas = {
  joiContact,
  joiStatus,
};

module.exports = {
  Contact,
  schemas,
};
