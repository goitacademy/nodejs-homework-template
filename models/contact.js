const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../utils");
const Joi = require("joi");

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
    favourite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favourite: Joi.boolean(),
});

const updateFavouriteSchema = Joi.object({
  favourite: Joi.boolean().required(),
});
const schemas = {
  addSchema,
  updateFavouriteSchema,
};

const Contact = model("db-contact", contactSchema);
module.exports = {
  Contact,
  schemas,
};
