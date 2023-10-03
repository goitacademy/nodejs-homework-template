import * as contactsService from '../models/contacts.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';

const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const addContactController = async (req, res) => {
    const { body } = req;
    const result = await contactsService.addContact(body);
    res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const result = await contactsService.updateContact(id, body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({
    message: 'Contact deleted',
  });
};


export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContactController),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};