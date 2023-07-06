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
      required: true,
    },
    phone: {
      type: String,
      required: true,
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

const Contact = model("contact", contactSchema);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object(
  {
    name: Joi.string()
      .min(2)
      .max(15)
      .messages({ "any.required": `missing required name field` })
      .required(),
    email: Joi.string()
      .email()
      .messages({
        "any.required": `missing required email field`,
      })
      .required(),
    phone: Joi.string()
      .min(5)
      .max(15)
      .messages({
        "any.required": `missing required phone field`,
      })
      .required(),
    favorite: Joi.boolean().messages({
      "any.required": `missing field favorite`,
    }),
  },
  { versionKey: false, timestamps: true }
);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = { Contact, schemas };
