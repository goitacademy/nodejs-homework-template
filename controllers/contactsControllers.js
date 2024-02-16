const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/services/contacts");

const {catchAsync} = require("../utils/catchAsync");

let getContacts = async (req, res, next) => {
  const { page = 1, limit = 20, favorite } = req.query;
  const contacts = await listContacts(req.user._id, page, limit, favorite);
  res.status(200).json(contacts);
};
getContacts = catchAsync(getContacts);

let getContact = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(req.user._id, contactId);
    res.status(200).json(contact);
};

getContact = catchAsync(getContact);

let deleteContact = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await removeContact(req.user._id, contactId);
    res.status(200).json(contactId);
};

deleteContact = catchAsync(deleteContact);

let createContact = async (req, res, next) => {
    const newContact = await addContact(req.user._id, req.body);
    res.status(201).json(newContact);
};

createContact = catchAsync(createContact);

let refreshContact = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await updateContact(req.user._id, contactId, req.body);
    res.status(200).json(contact);
};

refreshContact = catchAsync(refreshContact);

let updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(req.user._id, contactId, req.body);
  res.status(200).json(contact);
};

updateStatusContact = catchAsync(updateStatusContact);

module.exports = {
  getContacts,
  getContact,
  deleteContact,
  createContact,
  refreshContact,
  updateStatusContact
};
