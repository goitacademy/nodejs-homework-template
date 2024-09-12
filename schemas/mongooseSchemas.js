const mongoose = require("mongoose");

// Определение схемы
const Schema = mongoose.Schema;
const contactSchema = new Schema({
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
});

// Создание модели
const Contact = mongoose.model("User", contactSchema);
module.exports = Contact