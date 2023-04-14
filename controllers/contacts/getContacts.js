const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const getContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = { getContacts: ctrlWrapper(getContacts) };
