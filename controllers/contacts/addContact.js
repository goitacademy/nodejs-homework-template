const { Contact } = require("../../models/contact.js");
const { ctrlWrapper } = require("../../helpers/index.js");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  addContact: ctrlWrapper(addContact),
};
