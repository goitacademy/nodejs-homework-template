const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  res.json({ contacts, status: "succes", code: 200 });
};

const getContact = async (req, res) => {
  const [contact] = await getContactById(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ status: `Not found`, code: 404 });
  }
  res.json({ contact, status: "succes", code: 200 });
};

const addNewContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);
  res.status(201).json({ newContact, status: "succes", code: 201 });
};

const deleteContact = async (req, res, next) => {
  const status = await removeContact(req.params.contactId);
  if (!status) {
    return res.status(404).json({ status: `Not found`, code: 404 });
  }
  res.json({ status: `Сontact deleted`, code: 200 });
};

const updateContactById = async (req, res, next) => {
  const { status, updatedContact } = await updateContact(
    req.params.contactId,
    req.body
  );
  if (!status) {
    return res.status(404).json({ status: `Not found` });
  }
  res.json({ updatedContact, status: `succes`, code: 200 });
};

module.exports = {
  getContacts,
  getContact,
  addNewContact,
  deleteContact,
  updateContactById,
};
