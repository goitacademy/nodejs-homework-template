const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
} = require("../servise/contactsService");
const { HttpError } = require("../helpers/error");

async function getContacts(req, res, next) {
  const contacts = await listContacts();
  return res.json(contacts);
}

async function getContact(req, res, next) {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (!contact) {
    return next(HttpError(400, `Contact with id ${id} is not found`));
  }

  return res.json(contact);
}

async function createContact(req, res, next) {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const id = req.params.contactId;
  const deletedContact = await removeContact(id);

  if (!deletedContact) {
    return next(HttpError(400, `Contact with id ${id} is not found`));
  }

  return res.status(200).json({ message: `Contact with id ${id} is deleted` });
}

async function updatedContact(req, res, next) {
  const id = req.params.contactId;
  const response = await updateContact(id, req.body);

  if (response) {
    return res.json(response);
  }
  return next(HttpError(400, `Contact with id=${id} not found! `));
}

async function changeStatus(req, res, next) {
  const id = req.params.contactId;
  const { favorite } = req.body;
  const response = await updateStatusContact(id, { favorite });

  
  if (response) {
    return res.json(response);
  }
 
  return next(HttpError(400, `Contact with id=${id} not found! `));
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updatedContact,
  changeStatus,
};