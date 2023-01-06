import {
  addContact,
  deleteContact,
  getContacts,
  getContactById,
  updateContact,
} from '../services/contactsService.js';

const getAllContactsController = async (_, res) => {
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

const getContactByIdController = async (req, res) => {
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

const addContactController = async (req, res) => {
  const newContact = await addContact(req.body);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: { contact: newContact },
  });
};

const updateContactController = async (req, res) => {
  const {
    params: { contactId },
    body,
  } = req;

  const updatedContact = await updateContact(contactId, {
    ...body,
  });

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

const deleteContactController = async (req, res) => {
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

export default {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  deleteContactController,
};
