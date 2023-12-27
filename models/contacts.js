const joi = require("joi");
const { model, Schema } = require("mongoose");

const contactBodySchema = joi.object({
  name: joi
    .string()
    .min(3)
    .required()
    .messages({ "any.required": "missing required name field " }),
  phone: joi
    .string()
    .required()
    .messages({ "any.required": "missing required phone field " }),
  email: joi
    .string()
    .email()
    .required()
    .messages({ "any.required": "missing required email field " }),
  favorite: joi.boolean(),
});

const putContactsSchema = joi.object({
  name: joi.string().min(3),
  phone: joi.string(),
  email: joi.string().email(),
  favorite: joi.boolean(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi
    .boolean()
    .required()
    .messages({ "any.required": "missing required favorite field " }),
});

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
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
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = model("contact", contactsSchema);

module.exports = {
  contactBodySchema,
  putContactsSchema,
  updateFavoriteSchema,
  Contact,
};
