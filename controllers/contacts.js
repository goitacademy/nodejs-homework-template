const contacts = require("../models/contacts");
const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = addShema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const result = await contacts.addContact(req.body);

  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(result);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
