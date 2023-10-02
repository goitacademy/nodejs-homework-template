const {
  listContacts,
  contactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models");
const HttpError = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const getContactsList = async (req, res) => {
  const list = await listContacts();
  res.json(list);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contactBId = await contactById(id);

  if (!contactBId) {
    throw HttpError(404, `Not found`);
  }

  res.json(contactBId);
};

const addNewContact = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const removeContactById = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json({ message: "contact deleted" });
};

const updateContactById = async (req, res) => {
  const { id } = req.params;

  const contact = await updateContact(id, req.body);
  if (!contact) {
    throw HttpError(404, `Not found`);
  }

  res.json(contact);
};

module.exports = {
  getContactsList: ctrlWrapper(getContactsList),
  getContactById: ctrlWrapper(getContactById),
  addNewContact: ctrlWrapper(addNewContact),
  removeContactById: ctrlWrapper(removeContactById),
  updateContactById: ctrlWrapper(updateContactById),
};
