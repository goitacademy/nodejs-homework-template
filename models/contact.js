const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../utils/handleMongooseError");

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[0-9 ()-]+$/)
    .required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().lowercase(),
  phone: Joi.string().regex(/^[0-9 ()-]+$/),
}).or("name", "phone", "email");

const updateStatusContactSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
