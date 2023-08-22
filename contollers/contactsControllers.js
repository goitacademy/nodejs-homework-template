const contacts = require("../models/contactsBL");
const controllerWrapper = require("../helpers/controllerWrapper");
const errorHandler = require("../helpers/errorsHandler");

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const contact = await contacts.getContactById(req.params.contactId);

  if (!contact) {
    throw errorHandler(404, "Not found");
  }
  res.json(contact);
};

const removeContact = async (req, res) => {
  const contact = await contacts.removeContact(req.params.contactId);
  console.log(contact);
  if (!contact) {
    throw errorHandler(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  console.log(req.body);
  const contact = await contacts.addContact(req.body);

  if (Object.keys(req.body).length === 0) {
    throw errorHandler(400, "missing fields");
  }

  res.status(201).json(contact);
};

const updateContact = async (req, res) => {
  const contact = await contacts.updateContact(req.params.contactId, req.body);
  if (!contact) {
    throw errorHandler(404, "Not Found");
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res) => {
  const contact = await contacts.updateStatusContact(
    req.params.contactId,
    req.body
  );
  if (!contact) {
    throw errorHandler(404, "Not Found");
  }
  res.status(200).json(contact);
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  removeContact: controllerWrapper(removeContact),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
