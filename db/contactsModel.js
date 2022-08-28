const mongoose = require("mongoose");
const { contactsSchema } = require("./schema");

const Contact = mongoose.model("contacts", contactsSchema);

module.exports = {
  Contact,
};
