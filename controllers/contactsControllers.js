const contacts = require("../models/contacts");
const { HttpError } = require("../helpers/HttpError");

const ctrlWrapper = require("../decorators /ctrl.Wrapper");

const listContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw new HttpError(404, `Not found`);
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await contacts.addContact(
    req.body.name,
    req.body.email,
    req.body.phone
  );
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw new HttpError(404, `Not found`);
  }
  res.json({
    message: `contact deleted`,
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw new HttpError(404, `Not found`);
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
