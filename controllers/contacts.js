const { listContacts, getContactById, addContact, removeContact, updateContact  } = require('../models/contacts');
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts)  
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.status(200).json(contact)      
  } else {
    throw HttpError(404, 'Not found')
  };  
};

const add = async (req, res, next) => {
  const contact = await addContact(req.body);
  res.status(201).json(contact)
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  if (!contact) {
    throw HttpError(404, 'Not found')
  };    
  res.status(200).json(contact)  
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) {
    throw HttpError(404, 'Not found')
  };    
  res.status(200).json({message: 'contact deleted'})  
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById), 
  add: ctrlWrapper(add), 
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
}