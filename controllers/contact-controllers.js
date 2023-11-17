import contactService from '../models/contacts.js';
import { HttpError } from '../helpers/index.js';
import schema from '../schemas/contact-schema.js';
import { ctrlWrapper } from '../decorators/index.js';

const getAllContacts = async (req, res, next) => {
  const result = await contactService.listContacts();
  res.json(result);
};

const getContactsById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactService.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const { error } = schema.contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactService.addContact(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactService.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({ message: 'contact deleted' });
};
const updateContacts = async (req, res, next) => {
  const { error } = schema.contactUpdateSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contactService.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContacts: ctrlWrapper(updateContacts),
};
