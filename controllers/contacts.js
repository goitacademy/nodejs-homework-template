const { Contact } = require('../models/contact');

async function listContacts(req, res, next) {
  const user = req.user._id;

  const contacts = await Contact.find({ owner: user });
  res.status(200).json(contacts);
}

async function getContactById(req, res, next) {
  const { contactId } = req.params;
  const user = req.user._id;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'contact not found' });
  }

  if (!contact.owner.equals(user)) {
    return res.status(401).json({ message: 'not authorize' });
  }

  res.status(200).json(contact);
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const user = req.user._id;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'contact not found' });
  }

  if (!contact.owner.equals(user)) {
    return res.status(401).json({ message: 'not authorize' });
  }

  await Contact.findByIdAndRemove(contactId);
  res.status(200).json({ message: `contact "${contact.name}" deleted` });
};

const addContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create({ ...req.body, owner: req.user._id });
    res.status(201).json(newContact);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: `Contact "${req.body.name}" already exist` });
    }
    res.status(400).json({ message: error.message });
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const user = req.user._id;

    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'contact not found' });
    }

    if (!contact.owner.equals(user)) {
      return res.status(401).json({ message: 'not authorize' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updatedContact);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: `Contact "${req.body.name}" already exist` });
    }
    res.status(400).json({ message: error.message });
  }
};

const updateContactStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const user = req.user._id;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'contact not found' });
  }

  if (!contact.owner.equals(user)) {
    return res.status(401).json({ message: 'not authorize' });
  } else {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: req.body.favorite },
      { new: true }
    );
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
