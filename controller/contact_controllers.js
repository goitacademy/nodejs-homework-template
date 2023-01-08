const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../db/contacts");
const { HttpError } = require("../helpers/helpers");

async function getContacts(req, res) {
  const contacts = await listContacts();
  console.log("contacts", contacts);
  res.status(200).json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  return res.status(200).json(contact);
}

async function addContactById(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
 
  const newContact = await addContact({ contactId, name, email, phone });
 return res.status(201).json(newContact);
}

async function removeContactById(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  await removeContact(contactId);
 return res.status(200).json({ message: "contact deleted" });
}

async function updateContactById(req, res) {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  if ({ name, email, phone } === null) {
    throw HttpError(400, "Missing fields");
  }
  const contactUpdate = await updateContact( contactId, req.body );
  if (!contactUpdate) {
    throw HttpError(404, "Not found");
  }
  
  res.status(200).json(contactUpdate);
}

module.exports = {
  getContacts,
  getContact,
  addContactById,
  removeContactById,
  updateContactById,
};
