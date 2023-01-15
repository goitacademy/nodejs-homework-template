const { CustomError } = require("../helpers/index");
const { Contact } = require("../models/contacts");

async function getContacts(req, res, next) {
  const contacts = await Contact.find({});
  if (!contacts) {
    next(new CustomError(404, "Contact not found"));
  }
  res.status(200).json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    next(new CustomError(404, "Contact not found"));
  }
  return res.json(contact);
}

async function createContact(req, res, next) {
  const { body } = await req;
  const newContact = await Contact.create(body);
  res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);

  if (!contact) {
    next(
      new CustomError(404, "Requested contact (id) is not present in database")
    );
  }

  res.status(200).json(`contact deleted`);
}

async function changeContact(req, res, next) {
  const { contactId } = req.params;
  const { body } = await req;
  if (!body) {
    return new CustomError(400, "missing fields");
  }

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );
  if (!updatedContact) {
    next(
      new CustomError(404, "Requested contact (id) is not present in database")
    );
  }
  res.status(200).json(updatedContact);
}

async function changeStatus(req, res, next) {
  const { contactId } = req.params;
  const { body } = await req;

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );

  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(updatedContact);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
  changeStatus,
};
