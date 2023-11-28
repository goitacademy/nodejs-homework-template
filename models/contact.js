const { model } = require("mongoose");
const { mongooseContactSchema } = require("../schema/contacts");

const Contact = model("contact", mongooseContactSchema);

module.exports = Contact;
