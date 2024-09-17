const { Module } = require("module");
const { Schema, model } = require("mongoose");
const {handleMongooseError} = require("../utils/")

const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: [true, "Set email for contact"],
  },
  phone: {
    type: String,
    required: [true, "Set phone for contact"],
    match: phonePattern,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
},
{
  versionKey: false,
  timestamps: true,
  collection: "contacts"
}

);

contactSchema.post("save", handleMongooseError)

const Contact = model("contact", contactSchema);

module.exports = { Contact };
