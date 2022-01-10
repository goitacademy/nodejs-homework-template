const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contacts = new Schema({
  name: { type: String, required: [true, "Set name for contact"] },
  // ------------------------------
  // индексация для быстрого поиска
  // name: {type:String, index:1},
  // ------------------------------
  email: { type: String },
  phone: { type: String },
  favorite: { type: Boolean, default: false },
});

const Contacts = mongoose.model("contacts", contacts);

module.exports = Contacts;
