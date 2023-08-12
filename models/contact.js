const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const { handleMongooseError } = require("../helpers/handleMongooseError");

const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  { versionKey: false, timestamps: true }
);

// contactSchema.post("save", handleMongooseError);

const validationSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .pattern(phoneRegex)
    .required(),
  favorite: Joi.boolean().optional(),
  email: Joi.string()
    .email()
    .required(),
});

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const schemas = {
  validationSchema,
  updateStatusContactSchema,
};
const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
