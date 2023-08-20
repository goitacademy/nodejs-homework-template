const { Contact } = require("../models/contact");

const getAllListContacts = async (req, res) => {
  const result = await Contact.find({}, "-favorite");
  res.json(result);
};

module.exports = getAllListContacts;