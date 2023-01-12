//Колбеки які відпрацьовують в роутах це контроллери.
//Їх можна винести окремо у папку controllers

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");
const { schemaRequired, schemaOptional } = require("../schemas/validation");

async function getContacts(req, res, next) {
  const list = await listContacts();
  res.json(list);
}

async function getContact(req, res, next) {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (contact) {
    res.status(200).json(contact);
    return;
  }
  res.status(404).json({ message: "Not found" });
}

async function createContact(req, res, next) {
  const body = { favorite: false, ...req.body };

  const validationResult = schemaRequired.validate(body);
  if (validationResult.error) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }

  const contact = await addContact(body);
  res.status(201).json(contact);
}

async function deleteContact(req, res, next) {
  const id = req.params.contactId;
  if (id) {
    const ok = await removeContact(id);
    if (ok) {
      res.json({ message: "contact deleted" });
      return;
    }
  }
  res.status(404).json({ message: "Not found" });
}

async function editContact(req, res, next) {
  const id = req.params.contactId;
  const body = req.body;
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const validationResult = schemaOptional.validate(body);
  if (validationResult.error) {
    res.status(400).json({ message: "invalid value content" });
    return;
  }

  const contact = await updateContact(id, body);
  if (contact) {
    res.status(200).json(contact);
    return;
  }
  res.status(404).json({ message: "Not found" });
}

async function setFavoriteContact(req, res, next) {
  const contactId = req.params.contactId;
  const body = req.body;
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing field favorite" });
    return;
  }

  const contact = await updateStatusContact(contactId, body);
  if (contact) {
    res.status(200).json(contact);
    return;
  }

  res.status(404).json({ message: "Not found" });
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  editContact,
  setFavoriteContact,
};
