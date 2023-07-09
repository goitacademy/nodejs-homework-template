const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = { getAllContacts: ctrlWrapper(getAllContacts) };
