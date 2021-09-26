const { NotFound } = require('http-errors');

const contactsOperations = require('../model/contacts');

const listContacts = async (_, res, next) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts
    }
  });
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(Number(contactId));
  if (!contact) {
    throw new NotFound(`Product with id ${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    contact
  });
};

const addContact = async (req, res, next) => {
  const result = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(Number(contactId));
  if (!result) {
    throw new NotFound(`Product with id ${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'contact deleted'
  });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateById(Number(contactId), req.body);
  if (!result) {
    throw new NotFound(`Product with id ${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  });
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
};
