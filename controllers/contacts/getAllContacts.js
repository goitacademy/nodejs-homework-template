const { Contact } = require("../../models");

const getAllContacts = async (req, res, next) => {
  const allContacts = await Contact.find();
  res.json(allContacts);
};

module.exports = getAllContacts;
