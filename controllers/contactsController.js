const {RequestError} = require('../helpers');
const contacts = require('../models/contacts');
const {addSchema} = require('../schemas/schema');

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const {contactId} = req.params;
  const result = await contacts.getContactById(contactId);

  if (!result) {
    throw new RequestError(404, 'Not found');
  }
  res.json(result);
};

const getPost = async (req, res) => {
  const {error} = addSchema.validate(req.body);
  if (error) throw new RequestError(400, 'missing required name field');

  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const {error} = addSchema.validate(req.body);
  if (error) throw new RequestError(400, 'missing fields');
  const {contactId} = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) throw new RequestError(404, 'Not Found');
  res.json(result);
};

const deleteById = async (req, res) => {
  const {contactId} = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) throw new RequestError(404, 'Not found');
  res.json({message: 'contact deleted'});
};

module.exports = {getAll, getById, getPost, deleteById, updateById};
