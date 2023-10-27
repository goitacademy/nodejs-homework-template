const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
});

const Movie = model();
