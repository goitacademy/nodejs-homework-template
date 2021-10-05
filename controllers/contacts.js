const contactsOperations = require('../model');
const CreateError = require('http-errors');

const listContacts = async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts,
    },
  });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsOperations.getContactById(id);
  if (!contact) {
    throw new CreateError(404, `Prooduct with id=${id} not found`);
  }
  res.json(contact);
};

const addContact = async (req, res, next) => {
  const result = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsOperations.removeContact(id);
  if (!result) {
    throw new CreateError(404, `Prooduct with id=${id} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Success delete',
  });
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsOperations.updateById(id, req.body);
  if (!result) {
    throw new CreateError(404, `Product with id=${id} not found`);
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
  getById,
  addContact,
  deleteContact,
  updateContact,
};
