const { Contact } = require("../models");
const { ctrlWrap } = require("../helpers");
const getContacts = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};
module.exports = { getContacts: ctrlWrap(getContacts) };
