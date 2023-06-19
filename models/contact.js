const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
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
contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateStatusContactSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
  updateStatusContactSchema,
};
