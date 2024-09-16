const Contact = require('../models/contactModel');
const catchAsync = require('../utils/catchAsync');

const listContacts = catchAsync(async (req, res) => {
  try {
    const { _id } = req.user;
    const contacts = await Contact.find({ owner: _id });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getContactById = catchAsync(async (req, res) => {
  try {
    const { contact } = req;
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const removeContact = catchAsync(async (req, res) => {
  try {
    const { contactId } = req.params;
    await Contact.findByIdAndDelete(contactId);
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const addContact = catchAsync(async (req, res) => {
  try {
    const { _id } = req.user;
    const newContact = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updateContact = catchAsync(async (req, res) => {
  try {
    const { contactId } = req.params;
    const newContact = await Contact.findByIdAndUpdate(contactId, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    }, {
      new: true,
    });
    res.status(200).json(newContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updateStatusContact = catchAsync(async (req, res) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const newContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

    if (!newContact) {
      return res.status(400).json({ message: 'missing field favorite' });
    }

    res.status(200).json(newContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};