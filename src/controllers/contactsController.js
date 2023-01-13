import {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  deleteContact,
} from '../services/contactsService.js';

export const getAllContactsController = async (_, res) => {
  const contactList = await getContacts();

  if (!contactList) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Contact list not found',
      data: 'Not found',
    });
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      contactList,
    },
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: 'Not Found',
    });
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { contact },
  });
};

export const addContactController = async ({ body }, res) => {
  const newContact = await addContact(body);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { contact: newContact },
  });
};

export const updateContactController = async (req, res) => {
  const {
    params: { contactId },
    body,
  } = req;

  const updatedContact = await updateContact(contactId, body);

  if (!updatedContact) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: 'Not Found',
    });
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { updatedContact },
  });
};

export const updateContactStatusController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const updatedContact = await updateContactStatus(contactId, favorite);

  if (!updatedContact) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: 'Not Found',
    });
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { updatedContact },
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await deleteContact(contactId);

  if (!deletedContact) {
    return res.status(404).json({
      status: 'error',
      code: 404,
      message: `Not found contact id: ${contactId}`,
      data: 'Not Found',
    });
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Contact deleted',
    data: 'Contact deleted',
  });
};
