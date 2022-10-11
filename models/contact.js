const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../middlewares");

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
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\+)?((\D) ?\d|\d)(([ -]?\d)|( ?(\D) ?)){5,12}\d$/)
    .required(),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /^(\+)?((\D) ?\d|\d)(([ -]?\d)|( ?(\D) ?)){5,12}\d$/
  ),
  favorite: Joi.boolean().required(),
});
const schemas = {
  addShema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
