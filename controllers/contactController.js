const { 
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact, 
  } = require('../models/contacts');

  const { catchAsync, AppError } = require('../utils');

  const listContactsController = catchAsync (async (req, res) => {
    const contacts = await listContacts();
    res.status(200).json({
        contacts,
    });
  });

  const getContactByIdController = catchAsync (async (req, res) => {
    const { id } = req.params;
    const contact = await getContactById(id);  
    res.status(200).json({
        contact,
    });
});

const addContactController = catchAsync (async (req, res) => {
    const { body } = req;
    const newContact = await addContact(body);
    res.status(201).json({
            contact: newContact,
          });
});

const removeContactController = catchAsync (async (req, res) => {
    const { id } = req.params;
    const newContact = await removeContact(id);
    res.status(200).json({"message": "contact deleted"});
});

const updateContactController = catchAsync (async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    const contact = await updateContact(id, body);
    
    res.status(200).json({
      contact,
    });
  });

  module.exports = {
    listContactsController,
    getContactByIdController,
    addContactController,
    removeContactController,
    updateContactController,
  }