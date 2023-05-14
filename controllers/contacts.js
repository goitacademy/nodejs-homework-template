const {listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact} = require("../models/contacts");
const {nanoid} = require("nanoid");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const contactId = nanoid();

const getAll = async (__, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const contact = await getContactById(req.params.contactId);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(contact);
};

const create = async (req, res) => {
  const newContact = {
    id: contactId,
    ...req.body,
  };

  const result = await addContact(newContact);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(newContact);
};

const remove = async (req, res) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({message: "contact deleted"});
};

const update = async (req, res) => {
  const result = await updateContact(req.params.contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const favorite = async (req, res) => {
  if (!req.body) {
    throw HttpError(400, "missing field favorite");
  }

  const result = await updateStatusContact(req.params.contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};
module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  create: ctrlWrapper(create),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
  favorite: ctrlWrapper(favorite),
};
