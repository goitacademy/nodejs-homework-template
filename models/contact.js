const { Schema, model } = require("mongoose");
const Joi = require("joi");

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
  { versionKey: false }
);

const schema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  favorite: Joi.boolean(),
});

const statusSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, schema, statusSchema };
