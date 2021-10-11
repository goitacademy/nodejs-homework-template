const { model } = require("mongoose");
const contactSchema = require("./contactSchema");

const Contact = model("contact", contactSchema);

module.exports = { Contact };
