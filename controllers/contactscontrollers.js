const { HttpError } = require("../addoption/");
const { catchAsync } = require("../addoption");
const schema = require("../validation/schema");
// const { updateContactService } = require("../services/contacts");
const contactsModels = require("./../models/contactsModels");

const listContacts = catchAsync(async (req, res) => {
  const result = await contactsModels.listContacts();
  res.status(200).json(result);
});

const getContactById = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsModels.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

const removeContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsModels.removeContact(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
});

const addContact = catchAsync(async (req, res) => {
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  const result = await contactsModels.addContact(req.body);
  res.status(201).json(result);
});

const updateContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsModels.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

const updateStatusContact = catchAsync(async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "Missing field favorite" });
  }
  const result = await contactsModels.updateStatusContact(contactId, req.body);

  res.status(200).json(result);

  return result;
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
