const { model } = require("mongoose");
const contactSchema = require("../schemas/schemaMongoose");
const Contact = model("contact", contactSchema);

module.exports = Contact;
