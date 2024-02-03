const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
  const list = await Contact.find({}, '-createdAt -updatedAt');
  res.json(list);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const el = await Contact.findById(id);
  if (!el) {
    throw HttpError(404, 'Not found');
  }
  res.json(el);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const deleteEl = await Contact.findByIdAndDelete(id);
  if (!deleteEl) {
    throw HttpError(404, 'Not found');
  }
  res.json(deleteEl);
};

const createContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updatedEl = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedEl) {
    throw HttpError(404, 'Not found');
  }
  res.json(updatedEl);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const updatedEl = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedEl) {
    throw HttpError(404, 'Not found');
  }
  res.json(updatedEl);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
