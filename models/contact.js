const { model } = require("mongoose");

const { contactSchema } = require("./schemas");

const Contact = model("contact", contactSchema);

module.exports = Contact;
