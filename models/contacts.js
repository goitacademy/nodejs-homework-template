const mongoose = require("mongoose");
const { schema } = require("../schemas/contacts");

const Contact = mongoose.model("contacts", schema);
module.exports = { Contact };
