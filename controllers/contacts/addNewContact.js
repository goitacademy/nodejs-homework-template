const { Contact } = require("../../models/contacts");

const addNewContact = async (req, res, next) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

module.exports = addNewContact;
