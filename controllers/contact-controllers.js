import Contact from '../models/contacts.js';

import { HttpError } from '../helpers/index.js';

import { ctrlWrapper } from '../decorators/index.js';

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...filterParams } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner, ...filterParams };
  const result = await Contact.find(filter, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'email subscription');
  res.json(result);
};

const getContactsById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;

  const result = await Contact.create({
    ...req.body,
    owner,
  });

  res.status(201).json(result);
};

const updateContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const updateStatusContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findByOneDelete({ _id: contactId });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({ message: 'contact deleted' });
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addContact: ctrlWrapper(addContact),
  updateContacts: ctrlWrapper(updateContacts),
  updateStatusContacts: ctrlWrapper(updateStatusContacts),
  deleteContact: ctrlWrapper(deleteContact),
};
