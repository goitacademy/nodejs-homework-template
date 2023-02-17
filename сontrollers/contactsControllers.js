const Contact = require('../models/contactsModel')

const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).send(contact);
};

const addContact = async (req, res) => {
    const { name, email, phone } = req.body;
    const newContact = await Contact.create({ name, email, phone });
    res.status(201).send(newContact);
};

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!contact) {
    return res.status(404).json({ message: "Not found" });
    }
    res.status(201).send(contact);
};

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const updetedFavorite = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updetedFavorite) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).send(updetedFavorite);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
};