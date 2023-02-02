const { Contact } = require('../models/contact');

// Избавились от next в каждой функции, ибо юзаем его внутри мидлвары
const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getOneContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    const error = new Error(`Contact with id: ${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json(contact);
};

const addContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  if (!deletedContact) {
    const error = new Error(`Contact with id: ${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json(deletedContact);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!updatedContact) {
    throw new Error(`Contact with id=${contactId} not found`);
  }
  res.status(201).json(updatedContact);
};

const updateFavouriteField = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true },
  );
  if (!updatedContact) {
    throw new Error(`Contact with id=${contactId} not found`);
  }
  res.json(updatedContact);
};

module.exports = {
  getAllContacts,
  getOneContact,
  addContact,
  deleteContact,
  updateContact,
  updateFavouriteField,
};
