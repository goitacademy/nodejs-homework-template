const contacts = require("../../models/contacts");
const { nanoid } = require("nanoid");

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contact = await contacts.addContact(newContact);
  if (contact) {
    res.status(201).json(contact);
  }
};

module.exports = { createContact };
