const { NotFound } = require('http-errors');
const contactsOperation = require('../model');
const { sendSuccessRes } = require('../helpers');

const listContacts = async (req, res) => {
  const result = await contactsOperation.listContacts();
  sendSuccessRes(res, { result });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.getContactById(contactId);
  if (!result) {
    throw new NotFound(`Contact ${contactId} not found`);
  }
  sendSuccessRes(res, { result });
};

const addContact = async (req, res) => {
  const result = await contactsOperation.addContact(req.body);
  sendSuccessRes(res, { result }, 201);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Contact ${contactId} not found`);
  }
  sendSuccessRes(res, { message: 'Success delete' });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperation.updateById(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact ${contactId} not found`);
  }
  sendSuccessRes(res, result);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
};
