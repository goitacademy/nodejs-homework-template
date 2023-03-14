const { Contact } = require("../models/contacts");

const getListContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const getContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = await Contact.create({ name, email, phone });
  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findOneAndUpdate(contactId, req.body);

  if (!req.body) {
    res.status(400).json({ message: "missing fields" });
  }

  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!req.body) {
    res.status(400).json({ message: "missing field favorite" });
  }
  if (!contact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
};

module.exports = {
  getListContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactById,
  updateStatusContact,
};