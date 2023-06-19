const catchAsync = require("../utils/catchAsync");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const { createContactsDataValidator } = require("../utils/contactsValidator");

exports.getContactsList = catchAsync(async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({
    contacts,
  });
});

exports.getContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) return res.status(404).json({ message: "Not found" });
  res.status(200).json({
    contact,
  });
});

exports.createContact = catchAsync(async (req, res, next) => {
  const { error, value } = createContactsDataValidator(req.body);
  if (error) return res.status(400).json({ message: "missing required name field" });
  const newContact = await addContact(value);
  res.status(201).json({
    contact: newContact,
  });
});

exports.deleteContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) return res.status(404).json({ message: "Not found" });
  res.status(200).json({ message: "contact deleted" });
});

exports.updateContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const { error, value } = createContactsDataValidator(req.body);
  if (error) return res.status(400).json({ message: "missing fields" });
  const updatedContact = await updateContact(contactId, value);
  if (!updatedContact) return res.status(404).json({ message: "Not found" });
  res.status(200).json({
    contact: updatedContact,
  });
});
