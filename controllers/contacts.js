const contacts = require('../models/contacts');

const { Error, wrapControler } = require('../funcHelpers');

const getAllContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw Error(404, 'Not Found');
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw Error(404, 'Not Found');
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw Error(404, 'Not Found');
  }
  res.json({
    message: 'contact deleted',
  });
};

module.exports = {
  getAllContacts: wrapControler(getAllContacts),
  getContactById: wrapControler(getContactById),
  addContact: wrapControler(addContact),
  updateContact: wrapControler(updateContact),
  removeContact: wrapControler(removeContact),
};
