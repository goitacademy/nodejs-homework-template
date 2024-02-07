const { HttpError } = require("../helpers");
const tryCatch = require("../helpers/tryCatch");

const {
  listContacts,
  getContactById,
  createContact,
  upgradeContact,
  upgradeFavorite,
  removeContact,
} = require("../db/services/contactServices");

const getListContacts = async (req, res) => {
  const contactsAll = await listContacts();
  res.status(200).json(contactsAll);
};

const getContactId = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const newContact = await createContact(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const updateContactById = await upgradeContact(id, req.body);
  if (!updateContactById) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updateContactById);
};

const updateFavoriteContact = async (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    throw HttpError(400, "Missing field favorite");
  }
  const updateContactById = await upgradeFavorite(id, req.body);
  if (!updateContactById) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updateContactById);
};

const delContact = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await removeContact(id);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = {
  getListContacts: tryCatch(getListContacts),
  getContactId: tryCatch(getContactId),
  addContact: tryCatch(addContact),
  updateContact: tryCatch(updateContact),
  updateFavoriteContact: tryCatch(updateFavoriteContact),
  delContact: tryCatch(delContact),
};
