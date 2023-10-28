const { Schema, model } = require("mongoose");
const { handleSaveError } = require("./hooks");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

contactSchema.post("save", handleSaveError);

const Contact = model("contact", contactSchema);

module.exports = { Contact };
