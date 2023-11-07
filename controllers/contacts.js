const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../utils');

const getAll = async (_, res, next) => {
  const contacts = await Contact.find();
  if (!contacts) {
    throw HttpError({ status: 404, message: 'Not found' });
  }
  res.status(200).json(contacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError({ status: 404, message: 'Not found' });
  }
  res.status(200).json(contact);
};

const add = async (req, res, next) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw HttpError({ status: 404, message: 'Not found' });
  }
  res.status(200).json({ message: 'contact deleted' });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError({ status: 404, message: 'Not found' });
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError({ status: 404, message: 'Not found' });
  }
  res.status(200).json(contact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
