const { HttpError, decorator } = require('../helpers');
const { contactsScheme } = require('../schemes');

const {
  getListContact,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts.js')

const getAll = async (req, res, next) => {
  const contacts = await getListContact();
  res.json(contacts);
}
const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  if(!contactById){
    throw HttpError({status: 400, message:"Not found"});
  }
  res.json(contactById);
}
const addById = async (req, res, next) => {
  const { value, error } = contactsScheme.validate(req.body);
  if(error){
    throw HttpError({status: 400, message:"missing required name field"});
  }
  const addedContact = await addContact(value);
  res.json(addedContact);
}
const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const remoingContact = await removeContact(contactId);
  if(!remoingContact){
    throw HttpError({status: 404, message:"Not found"});
  }
  res.json({ message: "contact deleted" })
}
const updateBuId = async (req, res, next) => {
  const { contactId } = req.params;
  const { value, error } = contactsScheme.validate(req.body);
  if(error){
    throw HttpError({status: 400, message:"missing fields"});
  }
  const updatedContact = await updateContact(contactId, value);
  if(!updatedContact){
    throw HttpError({status: 404, message:"Not found"});
  }
  res.json(updatedContact);
}

module.exports = {
    getAll : decorator(getAll),
    getById : decorator(getById),
    addById : decorator(addById),
    deleteById : decorator(deleteById),
    updateBuId : decorator(updateBuId),
}