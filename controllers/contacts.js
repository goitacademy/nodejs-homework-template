// const fs = require('fs/promises')
const service = require('../services/contacts');

const listContacts = async (req, res, next) => {
  //res.json({ message: 'template message 1' });
  //console.log(req.query);
  const result = await service.listAllContacts();

  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  //res.json({ message: 'template message 2' });
  const id = req.params.id;
  const result = await service.getContactById(id);

  res.status(200).json(result);
};

const addContact = async (req, res, next) => {
  res.json({ message: 'Contact was created successfully' });
};

const updateContact = async (req, res, next) => {
  res.json({ message: 'Contact was update successfully' });
};

const removeContact = async (req, res, next) => {
  res.json({ message: 'Contact was deleted successfully.' });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
