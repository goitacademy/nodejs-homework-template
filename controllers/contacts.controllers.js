const { ValidationError } = require("../helpers/index");
const { Contact } = require("../models/contactShema");

async function getContacts(req, res, next) {
  const contacts = await Contact.find({});
  res.json({
    message: "Contacts Found",
    data: contacts,
  });
  return contacts;
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    return next(ValidationError(404, "Contact Not Found"));
  }
  return res.json({ message: "Contact found", data: contact });
}

async function createContact(req, res, next) {
  const newContacts = await Contact.create(req.body);
  res.status(201).json({ message: "Contact added", data: newContacts });
  return newContacts;
}

async function createPutContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return next(ValidationError(404, "Contact Not Found"));
  }
  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  res.status(200).json({ message: "Contact update", data: updateContact });
}

async function createStatusContact(req, res, next) {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return next(createError(404, "Contact Not Found"));
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );

  res.json({ message: "Contact updated", data: updatedContact });
}

async function removedContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    return next(ValidationError(404, `Not found contact with id=${contactId}`));
  }

  return res.status(200).json({ message: "Contact deleted", data: contact });
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  createPutContact,
  createStatusContact,
  removedContact,
};
