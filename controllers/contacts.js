const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers/index");

async function listContacts(req, res) {
  const data = await contacts.listContacts();
  res.json(data);
}

async function getContactById(req, res) {
  const id = req.params.contactId;
  const data = await contacts.getContactById(id);
  if (!data) {
    throw HttpError(404, "Not found!");
  }
  res.json(data);
}

async function addContact(req, res) {
  const data = await contacts.addContact(req.body);
  res.json(data);
}

async function removeContact(req, res) {
  const id = req.params.contactId;
  const data = await contacts.removeContact(id);
  console.log(data);
  if (!data) {
    throw HttpError(404, "Not found!");
  }
  res.json({ message: "contact deleted" });
}

async function updateContact(req, res) {
  const id = req.params.contactId;
  const data = await contacts.updateContact(id, req.body);
  if (!data) {
    throw HttpError(404, "Not found!");
  }

  res.json(data);
}

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
};
