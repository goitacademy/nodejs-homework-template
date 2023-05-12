const { HttpError } = require("../utils");
const { asyncWrapper } = require("../utils");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
} = require("../models/contacts");

const getListContacts = asyncWrapper(async (req, res, next) => {
  const allContacts = await listContacts();
  res.status(200).json(allContacts);
});

const getOneContact = asyncWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const oneContact = await getContactById(contactId);
  console.log(req.params);
  if (!oneContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(oneContact);
});

const addNewContact = asyncWrapper(async (req, res, next) => {
  const newContact = await addContact(req.body);
  console.log(req.body);
  res.status(201).json(newContact);
});

const deleteContact = asyncWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
});

const updateContact = asyncWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContactById(contactId, req.body);
  if (!updatedContact) {
    throw HttpError(404, "not found");
  }
  res.status(200).json(updatedContact);
});

module.exports = {
  getListContacts,
  getOneContact,
  addNewContact,
  deleteContact,
  updateContact,
};
