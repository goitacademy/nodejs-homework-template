const { WrongParamsError } = require("../helpers/errors");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require("../models/contacts");

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw new WrongParamsError(`Not found with id=${contactId}`);
  }

  res.status(200).json(contact);
};

const newContact = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const putContact = async (req, res) => {
  const result = await updateContact(req.params.contactId, req.body);
  res.status(200).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) {
    throw new WrongParamsError(`Not found with id=${contactId}`);
  }
  res.status(200).json(contact);
};

const setFavorite = async (req, res) => {
  const result = await updateStatusContact(
    req.params.contactId,
    req.body.favorite
  );
  res.status(200).json(result);
};

module.exports = {
  getContacts,
  newContact,
  getContact,
  putContact,
  deleteContact,
  setFavorite,
};
