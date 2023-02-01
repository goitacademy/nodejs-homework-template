const { createContact } = require("../../models/contacts");

const createContactController = async (req, res) => {
  const newContact = await createContact(req.body);
  res.status(201).json(newContact);
};

module.exports = createContactController;
