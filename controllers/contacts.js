const contacts = require("../models/contacts");
const schema = require("../schemas/contacts");

const list = async (req, res) => {
  const list = await contacts.listContacts();

  res.json(list);
};

const getById = async (req, res, next) => {
  const contact = await contacts.getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(contact);
};

const add = async (req, res, next) => {
  const { error } = schema.addContact.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
};

const update = async (req, res, next) => {
  const { error } = schema.updateContact.validate(req.body);
  console.log("req.body:", req.body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const updatedContact = await contacts.updateContact(
    req.params.contactId,
    req.body
  );

  if (!updatedContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(updatedContact);
};

const remove = async (req, res, next) => {
  const status = await contacts.removeContact(req.params.contactId);
  if (!status) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  list,
  getById,
  add,
  update,
  remove,
};
