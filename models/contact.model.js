const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Contact = new Schema({
  name: String,
  email: String,
  phone: String,
  favorite: false,
});

module.exports = mongoose.model("Contact", Contact);
