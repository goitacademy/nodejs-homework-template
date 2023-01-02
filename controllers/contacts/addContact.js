const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const newContact = req.body;
  const result = await Contact.create(newContact);
  return res.status(201).json(result);
};

module.exports = addContact;
