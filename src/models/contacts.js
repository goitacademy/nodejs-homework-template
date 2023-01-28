const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  name: { type: String, required: [true, "Set name for contact"] },
  email: { type: [String, "Set email for contact"], 
    // match: /^(\d{3}) \d{3}-\d{2}-\d{2}$/, 
    required: false },
  phone: { type: [String, "Set phone for contact"], required: true },
  favorite: { type: [Boolean, "Favorite must be true or false"], default: false },
  //   enum  - choose from list
  // genre:{ type: String, enum: ["fantastic", "love"], required: true}
  //   match - specific format of number example: ISBN-13: 978-2-266-11156-0,
  //   unique - дополнит задать настройки в indexes: create->name->field->sort any->options=create unique index
  //   isbn:{ type: String, match: /^\d{3}-\d-\d{3}-\d{5}-\d$/, unique: true,  required: true}
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
