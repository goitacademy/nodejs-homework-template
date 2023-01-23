const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = req.body;
  const result = await Contact.create({ ...newContact, owner });
  return res.status(201).json(result);
};

module.exports = addContact;
