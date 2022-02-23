const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');

const getListContactsController = async (_, res) => {
  const contacts = await listContacts();
  res.json({
    status: 'succes',
    code: 200,
    contacts,
  });
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }
  res.json({
    status: 'succes',
    code: 200,
    contactById,
  });
};

const addContactController = async (req, res) => {
  const newContact = await addContact(req.body);

  if (req.body.name && req.body.email && req.body.phone) {
    res.status(201).json({
      status: 'succes',
      code: 201,
      newContact,
    });
  }
  res.status(400).json({
    status: 'error',
    code: 400,
    message: 'missing required name field',
  });
};

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const deleteContact = await removeContact(contactId);
  if (!deleteContact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }
  res.json({
    status: 'succes',
    code: 200,
    message: 'contact deleted',
  });
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;

  if (!req.body.name && !req.body.email && !req.body.phone) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing fields',
    });
  }
  const changeContact = await updateContact(contactId, req.body);
  if (!changeContact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id=${contactId} not found`,
    });
  }
  res.json({
    status: 'succes',
    code: 200,
    changeContact,
  });
};

module.exports = {
  getListContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
};
