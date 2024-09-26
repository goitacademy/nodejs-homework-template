const Contact = require("../../models/contacts.js");

const addContact = async (req, res, _) => {
  const { body } = req;
  const result = await Contact.create(body);
  res.status(201).json(result);
};

module.exports = addContact;
