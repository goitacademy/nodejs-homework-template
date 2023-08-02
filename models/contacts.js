const { model } = require("mongoose");
const { contactSchema } = require("../helpers");

const Contact = model("contact", contactSchema);

module.exports = Contact;