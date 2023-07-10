const { Contact } = require("../models/index.js");
const { ctrlWrapper } = require("../helpers/index.js");

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = {
  addContact: ctrlWrapper(addContact),
};
