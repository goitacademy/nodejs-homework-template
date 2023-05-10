const { Schema, model } = require("mongoose");
const {handleMongooseError} = require("../helpers");
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
  { versionKey: false, timestamps: true }
);

const contactAddSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .min(10)
    .max(15)
    .required()
    .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: [Joi.string(), Joi.number().min(10).max(15)],
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateFavoriteSchema,
};

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };