const contacts = require("../models/contacts");
const { HttpError,ctrlWrapper } = require('../helpers');




const getListContacts = async (req, res) => {  
  const result = await contacts.listContacts();
  res.json(result);  
}

const contactById = async (req, res) => {  
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result)  
}

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found")
  }
  res.json({
    message: "contact deleted"
  })
}

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
}

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  contactById:ctrlWrapper(contactById),
  addContact:ctrlWrapper(addContact),
  removeContact:ctrlWrapper(removeContact),
  updateContact:ctrlWrapper(updateContact)
}