const { NotFound } = require('http-errors');
const contactsOperation = require('../services');

const listContacts = async (req, res) => {
  const result = await contactsOperation.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.getContactById(contactId);
  if (!result) {
    throw new NotFound(`Contact ${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

const addContact = async (req, res) => {
  const result = await contactsOperation.addContact(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Contact ${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Success delete',
  });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.updateById(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact ${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
};
