const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

exports.getAll = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

exports.getContactById = async ({ params }, res) => {
  const { contactId } = params;
  const contact = await getById(contactId);
  res.status(200).json(contact);
};

exports.createContact = async ({ body }, res, next) => {
  const newContact = await addContact(body);
  res.status(201).json(newContact);
};

exports.deleteContactById = async ({ params }, res, next) => {
  const { contactId } = params;
  await removeContact(contactId);
  res.status(200).json({ message: "contact deleted" });
};

exports.changeContact = async ({ body, params }, res, next) => {
  const { contactId } = params;
  const updatedContact = await updateContact(contactId, body);
  res.status(200).json(updatedContact);
};
