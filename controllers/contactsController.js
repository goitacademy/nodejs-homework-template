
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

function handleInternalError(error) {
  console.error(error.message);
  return new Error('Internal server error');
}

const getAllContacts = async (_, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (err) {
    next(handleInternalError(err));
  }
};

const getById = async ({params}, res, next) => {
  try {
    const { contactId } = params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    res.status(200).json(contact);
  } catch (err) {
    next(handleInternalError(err));
  }
};

const add = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (err) {
    next(handleInternalError(err));
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    next(handleInternalError(err));
  }
};

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(updatedContact);
  } catch (err) {
    next(handleInternalError(err));
  }
};

module.exports = {
  getAllContacts,
  getById,
  add,
  update,
  remove,
};