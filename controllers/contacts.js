const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../utils');

const getOperationsSettings = '-updatedAt -createdAt';
const populateOptions = 'email';
const ownerField = 'owner';

const getAll = async (req, res, next) => {
  const { favorite } = req.query;
  const { _id: owner } = req.user;
  const contacts = await Contact.find(
    { owner },
    getOperationsSettings
  ).populate(ownerField, populateOptions);
  if (!contacts) {
    throw HttpError({ status: 404, message: 'Not found' });
  }
  if (favorite !== 'true') {
    res.status(200).json(contacts);
  } else {
    const favoriteContacts = contacts.filter(
      (contact) => contact.favorite === true
    );
    res.status(200).json(favoriteContacts);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(
    contactId,
    getOperationsSettings
  ).populate(ownerField, populateOptions);
  if (!contact) {
    throw HttpError({ status: 404, message: 'Not found' });
  }
  res.status(200).json(contact);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner }).populate(
    ownerField,
    populateOptions
  );
  res.status(201).json(contact);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId).populate(
    ownerField,
    populateOptions
  );
  if (!contact) {
    throw HttpError({ status: 404, message: 'Not found' });
  }
  res.status(200).json({ message: 'contact deleted' });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  }).populate(ownerField, populateOptions);
  if (!contact) {
    throw HttpError({ status: 404, message: 'Not found' });
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  }).populate(ownerField, populateOptions);
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
