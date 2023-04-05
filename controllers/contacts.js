const contactsOperations = require("../models/contacts");

const { HttpError } = require("../helpers");

const { controllerWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    contacts,
  });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    contact,
  });
};

const add = async (req, res, next) => {
  const newContact = await contactsOperations.addContact(req.body);
  res.status(201).json({
    newContact,
  });
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const remoteContact = await contactsOperations.removeContact(contactId);
  if (!remoteContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
    remoteContact,
  });
};

const putById = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await contactsOperations.updateContact(
    contactId,
    req.body
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    updatedContact,
  });
};

const putchById = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "missing fields");
  }
  const { contactId } = req.params;
  const updatedContact = await contactsOperations.updateContact(
    contactId,
    req.body
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    updatedContact,
  });
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  deleteById: controllerWrapper(deleteById),
  putById: controllerWrapper(putById),
  putchById: controllerWrapper(putchById),
};
