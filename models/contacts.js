const { Schema, model } = require("mongoose");
const joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const emailValide = /(.+)@(.+){2,}\.(.+){2,}/;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    match: emailValide,
    required: [true, "Set email for contact"],
  },
  phone: {
    type: String,
    required: [true, "Set phone for contact"],
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
});

contactSchema.post("save", handleSaveErrors);

const addContactShema = joi.object({
  name: joi.string().required(),
  email: joi.string().pattern(emailValide).required(),
  phone: joi.string().required(),
  favorite: joi.boolean(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required(),
});

const schemas = {
  addContactShema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
