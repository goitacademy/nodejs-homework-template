const { Contact } = require("../../models");
const addContact = async (req, res, next) => {
  const addContact = await Contact.create(req.body);
  res.status(201).json(addContact);
};

module.exports = addContact;
