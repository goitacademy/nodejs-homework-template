const { model } = require("mongoose");
const { contactSchema } = require("../schemas/contact");

const Contact = model("contact", contactSchema);

module.exports = Contact;
