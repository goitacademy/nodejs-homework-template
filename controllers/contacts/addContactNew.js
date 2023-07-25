const { Contact } = require("../../models/contacts");
const { ctrlWrapper } = require("../../helpers");

const addNewContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  addNewContact: ctrlWrapper(addNewContact),
};
