const contactsOperations = require("../../models/contacts");

const addContact = async (req, res) => {
  const newContact = await contactsOperations.addContact(req.body);
  res.status(201).json({ status: "succsess", code: 201, data: newContact });
};

module.exports = addContact;
