const { Contact } = require('../models/contact');

const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const allContacts = await Contact.find();
  res.status(200).json(allContacts);
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const oneContact = await Contact.findById(contactId);

  if (!oneContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(oneContact);
};

const createContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  if (!deletedContact) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json('Contact deleted');
};

const renewContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'Missing fields');
  }

  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'missing field favorite');
  }

  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!updatedContact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContact: ctrlWrapper(getContact),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  renewContact: ctrlWrapper(renewContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
