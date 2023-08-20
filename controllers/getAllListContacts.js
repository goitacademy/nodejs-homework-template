const { Contact } = require("../models/contacts");

const getAllListContacts = async (req, res) => {
  const result = await Contact.find({}, "-favorite");
  res.json(result);
};

module.exports = getAllListContacts;