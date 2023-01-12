// const api = require('../../models/contacts');

const Contact = require('../models/contactsMongo');

const getContacts = async (req, res) => {
  const contactsList = await Contact.find({}, '-__v');
  res.json({ contactsList, status: 200 });
};

const getOneContactById = async (req, res) => {
  const searchedContact = await Contact.findById(req.params.contactId, '-__v');

  if (!searchedContact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json({ searchedContact, status: 200 });
};

const addNewContact = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'missing required name field' });
  }

  const newContact = await Contact.create(req.body);
  res.status(201).json({ newContact, status: 201 });
};

const deleteContact = async (req, res) => {
  const result = await Contact.findByIdAndRemove(req.params.contactId);
  if (!result) {
    res.status(404).json({ message: 'Not found' });
  }
  res.json({ message: 'contact deleted', status: 200 });
};

const changeOldContact = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'missing fields' });
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json({ updatedContact, status: 200 });
};

const updateFavorite = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'missing field favorite' });
  }
  const updatedContact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json({ updatedContact, status: 200 });
};

module.exports = {
  getContacts,
  getOneContactById,
  addNewContact,
  deleteContact,
  changeOldContact,
  updateFavorite,
};
