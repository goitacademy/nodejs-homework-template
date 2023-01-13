const { Contact } = require("../models/contactModel");

const getContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.status(200).json({ contacts });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ contact });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contactToDelete = await Contact.findByIdAndRemove(contactId);
  if (!contactToDelete) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({ contact });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contact = await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ contact });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ contact });
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
