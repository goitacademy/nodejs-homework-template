const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  readContacts,
} = require("../models/contacts");

async function getContacts(req, res, next) {
  try {
    const contacts = await listContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    return next(error);
  }
}

async function getContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact.id) {
      return res.status(404).json({ message: "Not found!" });
    }
    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
}

async function postContact(req, res, next) {
  try {
    const contact = await addContact(req.body);
    return res.status(201).json({ contact });
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const contacts = await readContacts();
    if (!contacts.find((contact) => contact.id === contactId)) {
      return res.status(404).json({ message: "Not found" });
    }
    await removeContact(contactId);
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
}

async function putContact(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "missing fields" });
    }
    const { contactId } = req.params;
    const contacts = await readContacts();
    if (!contacts.find((contact) => contact.id === contactId)) {
      return res.status(404).json({ message: "Not found" });
    }

    const contact = await updateContact(contactId, req.body);
    return res.status(200).json({ contact });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContact,
  getContacts,
  postContact,
  deleteContact,
  putContact,
};
