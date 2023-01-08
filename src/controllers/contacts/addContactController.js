const { addContact } = require("../../services/contactsService");

const addContactController = async (req, res) => {
  const contact = await addContact(req.body);
  res.status(201).json(contact);
};

module.exports = { addContactController };
