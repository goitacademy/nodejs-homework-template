// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../middlewares");

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  favorite: Boolean,
});

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
