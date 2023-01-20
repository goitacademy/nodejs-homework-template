const { Contact } = require('../models/contact');

async function listContacts(req, res, next) {
  const contacts = await Contact.find({});
  res.status(200).json(contacts);
}

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json(contact);
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.status(200).json({ message: `contact "${contact.name}" deleted` });
};

const addContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Name must be unique' });
    }
    res.status(400).json({ message: error.message });
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { ...req.body },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: `Name "${req.body.name}" already exist` });
    }
    res.status(400).json({ message: error.message });
  }
};

const updateContactStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: req.body.favorite },
    { new: true }
  );
  if (!updatedContact) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.status(200).json(updatedContact);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};
