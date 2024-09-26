const { createNewContact } = require("../models/contacts");

const addContact = async (req, res, next) => {
  const result = await createNewContact(req.body);
  res.status(201).json(result);
};

module.exports = addContact;