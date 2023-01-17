import {
  setErrorResponse,
  setSuccessResponse,
} from '../helpers/setResponse.js';
import {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  deleteContact,
} from '../services/contactsService.js';

export const getAllContactsController = async (req, res) => {
  const { id: userId } = req.user;
  const contactList = await getContacts(userId);

  if (!contactList) {
    return res
      .status(404)
      .json(setErrorResponse(404, 'Contact list not found'));
  }

  res.json(setSuccessResponse(200, contactList));
};

export const getContactByIdController = async (req, res) => {
  const { id: userId } = req.user;
  const { contactId } = req.params;

  const contact = await getContactById(contactId, userId);

  if (!contact) {
    return res
      .status(404)
      .json(setErrorResponse(404, `Not found contact id: ${contactId}`));
  }

  res.json(setSuccessResponse(200, contact));
};

export const addContactController = async ({ body, user }, res) => {
  const { id: userId } = user;
  const newContact = await addContact(body, userId);

  res.status(201).json(setSuccessResponse(201, newContact));
};

export const updateContactController = async ({ body, params, user }, res) => {
  const { contactId } = params;
  const { id: userId } = user;

  const updatedContact = await updateContact(contactId, body, userId);

  if (!updatedContact) {
    return res
      .status(404)
      .json(setErrorResponse(404, `Not found contact id: ${contactId}`));
  }

  res.json(setSuccessResponse(200, updatedContact));
};

export const updateContactStatusController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { id: userId } = req.user;

  const updatedContact = await updateContactStatus(contactId, favorite, userId);

  if (!updatedContact) {
    return res
      .status(404)
      .json(setErrorResponse(404, `Not found contact id: ${contactId}`));
  }

  res.json(setSuccessResponse(200, updatedContact));
};

export const deleteContactController = async (req, res) => {
  const { id: userId } = req.user;
  const { contactId } = req.params;

  const deletedContact = await deleteContact(contactId, userId);

  if (!deletedContact) {
    return res
      .status(404)
      .json(setErrorResponse(404, `Not found contact id: ${contactId}`));
  }

  res.status(200).json(setSuccessResponse(200, 'Contact deleted'));
};
