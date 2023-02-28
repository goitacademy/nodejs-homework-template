const { model } = require("mongoose");
const connectMongo = require("./connection.js");
const contactSchema = require("./schema.js");

const Contacts = model("contacts", contactSchema);

module.exports = { connectMongo, Contacts };
