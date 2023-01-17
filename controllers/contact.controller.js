const { httpError } = require("../helpers/helpers");
const { Contact } = require("../models/contacts");

async function getListOfContacts(req, res, next) {
  const { limit } = req.query;
  const contacts = await Contact.find({}).limit(limit);
  return res.status(200).json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return next(httpError(404, "Not found"));
  }
  return res.status(200).json(contact);
}

async function createContact(req, res, next) {
  const newContact = await Contact.create(req.body);
  if (!newContact) {
    return next(httpError(404, "Not found"));
  }
  return res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contactToDelete = await Contact.findById(contactId);
  if (!contactToDelete) {
    return next(httpError(404, "Not found"));
  }
  await Contact.findByIdAndRemove(contactId);
  return res.status(200).json({ message: "contact deleted" });
}

async function editContact(req, res, next) {
  const { contactId } = req.params;
  const contactToUpdate = await Contact.findById(contactId);
  if (!contactToUpdate) {
    return next(httpError(404, "Not found"));
  }
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  return res.status(200).json(updatedContact);
}

async function updateStatusContact(req, res, next) {
  const { contactId } = req.params;
  const contactToUpdate = await Contact.findById(contactId);
  if (!contactToUpdate) {
    return next(httpError(404, "Not found"));
  }
  const updatedContactFavoriteField = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: req.body.favorite },
    {
      new: true,
    }
  );
  return res.status(200).json(updatedContactFavoriteField);
}

module.exports = {
  getListOfContacts,
  getContact,
  createContact,
  deleteContact,
  editContact,
  updateStatusContact,
};
