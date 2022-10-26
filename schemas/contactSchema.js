const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleSaveErrors = require("../helpers/handelSaveErrors");

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

const contactSchemaJoi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(15).required(),
  favorite: Joi.bool(),
});

const updateStatusJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("Contact", contactSchema);

module.exports = {
  Contact,
  contactSchemaJoi,
  updateStatusJoiSchema,
};
