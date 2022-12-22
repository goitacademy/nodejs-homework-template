const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');
const {
  addContactSchema,
  updateContactSchema,
} = require('../service/schemas/task');

const listContactsController = async (req, res, next) => {
  const data = await listContacts();
  res.json(data);
};

const getContactController = async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  if (data.length === 0) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  res.json(data);
};

const deleteContactController = async (req, res, next) => {
  const data = await removeContact(req.params.contactId);
  if (data) {
    res.json({ message: 'contact deleted' });
    return;
  }
  res.status(404).json({ message: 'Not found' });
};

const updateContactController = async (req, res, next) => {
  const { error } = await updateContactSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      message: 'missing or incorrect fields',
    });
    return;
  }

  const updatedContact = await updateContact(req.params.contactId, req.body);
  if (updatedContact) {
    res.json(updatedContact);
    return;
  }
  res.status(404).json({ message: 'Not found' });
};

const addContactController = async (req, res, next) => {
  const { error } = await addContactSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      message: 'missing or incorrect fields',
    });
    return;
  }
  const data = await addContact(req.body);
  res.status(201).json(data);
};

module.exports = {
  addContactController,
  listContactsController,
  getContactController,
  deleteContactController,
  updateContactController,
};
