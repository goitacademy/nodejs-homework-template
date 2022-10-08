const { addContact } = require("../../models/contactsModel");

const add = async (req, res) => {
  const body = req.query;
  const contact = await addContact(body);
  res.status(201).json(contact);
};

module.exports = add;
