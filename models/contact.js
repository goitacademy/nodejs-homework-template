const { Schema, model } = require("mongoose");
const { HandleMongooseError } = require("../middlewares/");
const Joi = require("joi");

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
  },
  { versionKey: false, timestamps: true }
);

const joiAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean(),
});

const joiUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { contactSchema, joiAddSchema, joiUpdateFavoriteSchema };

contactSchema.post("save", HandleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
