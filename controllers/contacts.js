const { NotFound } = require('http-errors');

const contactsOperation = require('../model/contacts');

const getAll = async (req, res, next) => {
  const contacts = await contactsOperation.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts
    }
  })
}

const getById = async(req, res, next) => {
  const { contactId } = req.params;
  console.log(typeof (contactId));
  const contact = await contactsOperation.getContactById(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: 'ok',
    code: 200,
    data: { contact }
  })
}

const add = async (req, res, next) => {
  const result = await contactsOperation.addContact(req.body)
  res.json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
}

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperation.removeContact(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not faund`);
  }
  res.json({
    status: 'succes',
    code: 200,
    message: 'contact deleted'
  });
}

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperation.updateById(contactId, req.body);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not faund`);
  }
  res.json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
}

module.exports = {
  getAll,
  getById,
  add,
  removeById,
  updateById
}
