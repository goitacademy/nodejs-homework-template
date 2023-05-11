const { model } = require("mongoose");
const { contactsSchema } = require("../schemas/contact");

const Contact = model("contact", contactsSchema);
module.exports = {
  Contact,
};
