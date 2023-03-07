const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleError } = require("../helpers");

const emailRegex =
  /^(?!.*@.*@.*$)(?!.*@.*--.*\..*$)(?!.*@.*-\..*$)(?!.*@.*-$)((.*)?@.+(\..{1,11})?)$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      math: emailRegex,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

contactSchema.post("save", handleError);

const contactSchemaJoi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegex),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactSchemaFavorite = Joi.object({
  favorite: Joi.boolean().required("missing field favorite"),
});

const schemas = {
  contactSchemaJoi,
  contactSchemaFavorite,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
