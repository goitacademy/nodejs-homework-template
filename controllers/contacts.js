const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const { ctrlWrapper } = require('../helpers');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const id = req.params.id;
  const contact = getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  const addedContact = addContact(newContact);

  res.status(201).json(addedContact);
};

const remove = async (req, res) => {
  const id = req.params.id;

  const removedContact = removeContact(id);

  if (removedContact) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, favorite } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  const updatedContact = updateContact(id, { name, email, phone, favorite });
  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(500).json({ message: "Update failed" });
  }
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById,
  add,
  remove,
  update,
};