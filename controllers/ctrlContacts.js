const modelsContacts = require('../models/contacts');
const { ctrlWrapper } = require('../utils');

/**
 * @ GET /api/contacts
 * нічого не отримує
 * викликає функцію listContacts для роботи з json-файлом contacts.json
 * повертає масив всіх контактів в json-форматі зі статусом 200
 *
 * @param {*} req
 * @param {*} res
 */
const listContacts = async (req, res) => {
  const result = await modelsContacts.listContacts();
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await modelsContacts.addContact(req.body);
  res.status(201).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await modelsContacts.getContactById(contactId);
  res.status(200).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  await modelsContacts.removeContact(contactId);
  res.status(204).json();
};

module.exports = {
  ctrlListContacts: ctrlWrapper(listContacts),
  ctrlAddContact: ctrlWrapper(addContact),
  ctrlGetContactById: ctrlWrapper(getContactById),
  ctrlRemoveContact: ctrlWrapper(removeContact),
};
