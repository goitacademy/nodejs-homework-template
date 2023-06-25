// const { readContacts } = require("../models/contacts");
const Contact = require("../models/contact");

const listContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = listContacts;
