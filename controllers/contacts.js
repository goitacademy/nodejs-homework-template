const contacts = require("../models/contacts");

const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res,next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    const error = HttpError(404, "Not found");
    return next(error);  }
  res.json(result);
};

const addContact = async (req, res) => {

  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res,next) => {
  const { contactId } = req.params;
  
  if (!req.body && contactId) {
    const error = HttpError(400, "missing fields");
    return next(error); 
  }
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    const error = HttpError(404, "Not found");
    return next(error);   }
  res.json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    const error = HttpError(404, "Not found");
    return next(error);  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
