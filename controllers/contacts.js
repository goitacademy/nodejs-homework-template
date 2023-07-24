const contacts = require('../models/contacts');
const {putSchema, postSchema} = require('../schemas/contacts');

const updateContact = async (request, responce, next) => {
  const {error} = putSchema.validate(request.body);
  if (error) {
    responce
      .status(400)
      .json('Please fill at least one of the following fields: name, email, phone');
  } else {
    const result = await contacts.updateContact(request.params.contactId, request.body);
    if (result === null) {
      responce.status(404).json(result);
    } else {
      responce.status(200).json(result);
    }
  }
};
const createContact = async (request, responce, next) => {
  const {error} = postSchema.validate(request.body);
  if (error) {
    responce.status(400).json('Please fill all the following fields: name, email, phone');
  } else {
    const result = await contacts.addContact(request.body);
    responce.status(201).json(result);
  }
};
const deleteContact = async (request, responce, next) => {
  const result = await contacts.removeContact(request.params.contactId);
  result
    ? responce.status(200).json('Contact deleted')
    : responce.status(404).json('Contact with requested id not found');
};
const getContactById = async (request, responce, next) => {
  const result = await contacts.getContactById(request.params.contactId);
  result
    ? responce.status(200).json(result)
    : responce.status(404).json('Contact with requested id not found');
};
const getContacts = async (request, responce, next) => {
  const result = await contacts.listContacts();
  responce.status(200).json(result);
};

module.exports = {
  updateContact,
  createContact,
  deleteContact,
  getContactById,
  getContacts,
};
