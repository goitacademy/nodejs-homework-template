const { addContact } = require("../../services/contactsService");

const addContactController = async (req, res) => {
  const { _id } = req.user;
  const contact = await addContact({ ...req.body, owner: _id });

  res.status(201).json(contact);
};

module.exports = { addContactController };
