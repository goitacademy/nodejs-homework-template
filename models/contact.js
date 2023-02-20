const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaValidationErrors } = require("../routes/api/helpers");

// const phoneRegexp = /^(\d{3}) \d{3}-\d{4}$/;
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
      // match: phoneRegexp,
      required: true,
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
  {
    versionKey: false,
  }
);

contactSchema.post("save", handleSchemaValidationErrors);

const contactIdSchema = Joi.object({
  contactId: Joi.string().alphanum().required(),
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const updateFavoritSchema = Joi.object({ favorite: Joi.bool().required() });

const schemas = {
  addSchema,
  updateFavoritSchema,
  contactIdSchema,
};
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
