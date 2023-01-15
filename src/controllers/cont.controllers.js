const contacts = require("../models/contacts.json");

const listContacts = (req, res) => {
  res.status(200).json(contacts);
};

const getById = (req, res) => {
  const { id } = req.params;
  const [contact] = contacts.filter((contact) => contact.id === id);
  if (!contact) {
    return res.status(404).json({
      status: "failure",
      message: ` Contact with id '${id}' not found`,
    });
  }
  res.status(200).json({ contact, status: "success" });
};

const addContact = (req, res) => {
  const { name, email, phone } = req.body;
  const contact = {
    id: Date.now(),
    name,
    email,
    phone,
  };
  res
    .status(201)
    .json({ contact, status: "success", message: "Contact added" });
};

const removeContact = (req, res) => {
  const { id } = req.params;
  const [contact] = contacts.filter((contact) => contact.id === id);
  if (!contact) {
    return res.status(404).json({
      status: "failure",
      message: `Contact with id '${id}' not found`,
    });
  }
  res.status(200).json({ status: "success", message: "Contact deleted" });
};

const updateContact = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const [contact] = contacts.filter((contact) => contact.id === id);
  if (!contact) {
    return res.status(404).json({
      status: "failure",
      message: `Contact with id '${id}' not found`,
    });
  }
  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  res
    .status(200)
    .json({ contact, status: "success", message: "Contact updated" });
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
