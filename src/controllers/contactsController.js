import createError from 'http-errors';
import { setSuccessResponse } from '../helpers/setResponse.js';
import {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  deleteContact,
} from '../services/contactsService.js';

export const getAllContactsController = async (req, res) => {
  const { userId } = req.user;
  let { page = 1, limit = 5, favorite } = req.query;
  limit = limit > 10 ? 10 : limit;

  const contactList = await getContacts(userId, { page, limit, favorite });

  if (!contactList) throw new createError(404, 'Contact list not found');

  res.json(setSuccessResponse(200, contactList));
};

export const getContactByIdController = async (req, res) => {
  const { userId } = req.user;
  const { contactId } = req.params;

  const contact = await getContactById(contactId, userId);

  if (!contact) {
    throw new createError(404, `Not found contact id: ${contactId}`);
  }

  res.json(setSuccessResponse(200, contact));
};

export const addContactController = async ({ body, user }, res) => {
  const { userId } = user;
  const newContact = await addContact(body, userId);

  res.status(201).json(setSuccessResponse(201, newContact));
};

export const updateContactController = async ({ body, params, user }, res) => {
  const { contactId } = params;
  const { userId } = user;

  const updatedContact = await updateContact(contactId, body, userId);

  if (!updatedContact) {
    throw new createError(404, `Not found contact id: ${contactId}`);
  }

  res.json(setSuccessResponse(200, updatedContact));
};

export const updateContactStatusController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { userId } = req.user;

  const updatedContact = await updateContactStatus(contactId, favorite, userId);

  if (!updatedContact) {
    throw new createError(404, `Not found contact id: ${contactId}`);
  }

  res.json(setSuccessResponse(200, updatedContact));
};

export const deleteContactController = async (req, res) => {
  const { userId } = req.user;
  const { contactId } = req.params;

  const deletedContact = await deleteContact(contactId, userId);

  if (!deletedContact) {
    throw new createError(404, `Not found contact id: ${contactId}`);
  }

  res.status(200).json(setSuccessResponse(200, 'Contact deleted'));
};
