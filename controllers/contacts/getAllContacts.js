const { Contact } = require("../../models/contacts");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = getAllContacts;
