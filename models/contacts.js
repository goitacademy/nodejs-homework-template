const { model } = require("mongoose");
const { contactSchemas } = require("../schemas");

const Contact = model("contact", contactSchemas.contactSchema);

module.exports = Contact;
