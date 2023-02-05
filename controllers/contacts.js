const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactsService");
const {
  WrongParametersError,
  MissingFieldsError,
} = require("../helpers/errors");

async function getContactsController(req, res, next) {
  const contacts = await getContacts();
  res.json(contacts);
}

async function getContactByIdController(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw new WrongParametersError("Not found");
  }
  res.json(contact);
}

async function postContactController(req, res, next) {
  const contact = await addContact(req.body);
  res.status(201).json(contact);
}

async function deleteContactController(req, res, next) {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.json({ message: "contact deleted" });
}

async function changeContactController(req, res, next) {
  if (!req.body) {
    throw new MissingFieldsError("Missing fields");
  }

  const contact = await updateContact(req.params.contactId, req.body);
  if (!contact) {
    throw new WrongParametersError("Not found");
  }

  res.json(contact);
}

async function changeFavoriteStatusController(req, res, next) {
  if (!req.body) {
    throw new MissingFieldsError("Missing field favorite");
  }
  const contact = await updateStatusContact(req.params.contactId, req.body);
  if (!contact) {
    throw new WrongParametersError("Not found");
  }
  res.json(contact);
}

module.exports = {
  getContactsController,
  getContactByIdController,
  postContactController,
  deleteContactController,
  changeContactController,
  changeFavoriteStatusController,
};
