const { Contact } = require("../models/contact");

const { ctrlWrapper } = require("../helpers");

const getListContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
};
