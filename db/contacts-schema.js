const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Joi = require("joi");
const myCustomJoi = Joi.extend(require("joi-phone-number"));
const { handleSaveError, runValidatorsAtUpdate } = require("./hooks");

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

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

const schema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: myCustomJoi.string().phoneNumber().required(),
  favorite: Joi.boolean(),
});

const schemaFav = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, schema, schemaFav };
