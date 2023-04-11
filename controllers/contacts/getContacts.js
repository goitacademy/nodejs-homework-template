const { Contact } = require("../../models");

const getContacts = async (req, res) => {
  const data = await Contact.find();
  res.status(200).json(data);
};

module.exports = getContacts;
