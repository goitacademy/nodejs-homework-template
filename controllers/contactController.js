const { Contact } = require('../models/contactModel');
const { createError } = require('../helpers');

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find();
      return res.json({
        data: contacts,
      });
}

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (contact) {
    return res.json({ data: { contact } });
  }
  return next(createError(404, "Not found"));
}

const addContact = async (req, res, next) => {
  const createdContact = await Contact.create(req.body);
  return res.status(201).json({
    data: { createdContact }
  });
}

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (contact) {
    await Contact.findByIdAndDelete(id);
    return res.json({ data: { contact } });
  }
  return next(createError(404, "Not found"));
}

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (contact) {
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({ data: { updatedContact } });
  }
  return next(createError(404, "Not found"));
}

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  if (!req.body) {
    return next(createError(400, "missing field favorite"));
  }
  const contact = await Contact.findById(id);
  if (contact) {
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    return res.json({ data: { updatedContact } });
  }
  return next(createError(404, "Not found"));
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};