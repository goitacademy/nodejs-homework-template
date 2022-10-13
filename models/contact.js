const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleErrors } = require("../helpers");

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.post("save", handleErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  favorite: Joi.bool(),
});

const updateSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const joiContactsSchemas = {
  addSchema,
  updateSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiContactsSchemas };
