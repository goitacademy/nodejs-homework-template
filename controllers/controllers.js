const contactsAPI = require("../models/contacts");

const schema = require("../schemas/schemas");

const getAll = async (req, res, next) => {
  const result = await contactsAPI.listContacts();
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await contactsAPI.getContactById(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(result);
};

const addItem = async (req, res, next) => {
  const newContact = req.body;
  const { error } = schema.newContact.validate(newContact);
  if (error) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const result = await contactsAPI.addContact(newContact);
  console.log(newContact);
  res.status(201).json(result);
};

const removeItem = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await contactsAPI.removeContact(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({ message: "contact deleted" });
};

const updateItem = async (req, res, next) => {
  const newContact = req.body;
  const id = req.params.contactId;
  const { error } = schema.updateContact.validate(newContact);
  if (error) {
    return res.status(400).json({ message: "missing fields" });
  }
  const result = await contactsAPI.updateContact(id, newContact);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(result);
};

module.exports = {
  getAll,
  getById,
  addItem,
  removeItem,
  updateItem,
};
