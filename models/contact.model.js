const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Contact = new Schema({
  name: String,
  email: String,
  phone: String,
});

module.exports = mongoose.model("Contact", Contact);
