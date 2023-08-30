// This variant file to load data from db_contacts database on mongodb.com
const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {type: String, required: [true, "Set name for contact"],},
    email: {type: String,},
    phone: {type: String,},
    favorite: {type: Boolean, default: false,},
  },
  { versionKey: false, timestamp: true }
);

module.exports = model("Contact", contactSchema, "contacts");
