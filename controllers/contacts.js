const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const data = await listContacts();
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, data });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, data: contact });
};

const add = async (req, res) => {
  const data = await addContact(req.body);
  res.status(201).json({ code: 201, data });
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = removeContact(contactId);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, message: "Contact removed" });
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const newContact = await updateContact(contactId, req.body);
  if (!newContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, data: newContact });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
};
