const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegex = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
// const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      // match: [emailRegex, "Please fill a valid email address"],
    },
    phone: {
      type: String,
      // match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactsSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().regex(phoneRegex),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().regex(phoneRegex),
  favorite: Joi.boolean(),
});

const schemas = {
  addSchema,
  updateSchema,
};

const Contact = model("Contact", contactsSchema);

module.exports = { Contact, schemas };
