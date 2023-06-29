const Contact = require("../../models");

const getAllContacts = async (req, res) => {
  const allContacts = await Contact.find();
  res.status(200).json(allContacts);
};

module.exports = getAllContacts;
