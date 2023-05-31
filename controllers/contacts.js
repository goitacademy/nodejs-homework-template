const { HttpError, controllerWrapper } = require("../helpers");
const contacts = require("../models/contacts");

async function getAllContacts(_, res) {
  const allContacts = await contacts.listContacts();

  res.json(allContacts);
}

async function getContactById(req, res) {
  const { contactId } = req.params;
  const contactById = await contacts.getContactById(contactId);

  if (!contactById) {
    throw HttpError(404, "Not found");
  }

  res.json(contactById);
}

async function addContact(req, res) {
  const contactToAdd = await contacts.addContact(req.body);

  res.status(201).json(contactToAdd);
}

async function deleteContact(req, res) {
  const { contactId } = req.params;
  const contactToRemove = await contacts.removeContact(contactId);

  if (!contactToRemove) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
}

async function updateContactById(req, res) {
  const { contactId } = req.params;
  const contactToUpdate = await contacts.updateContactById(contactId, req.body);

  if (!contactToUpdate) {
    throw HttpError(404, "Not found");
  }

  res.json(contactToUpdate);
}

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  deleteContact: controllerWrapper(deleteContact),
  updateContactById: controllerWrapper(updateContactById),
};
