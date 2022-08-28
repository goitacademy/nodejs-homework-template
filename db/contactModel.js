const mongoose = require("mongoose");
const { contactSchema } = require("./schema");

const Contact = mongoose.model("contacts", contactSchema);
module.exports = { Contact };
