const { HttpError } = require("../helpers/index");

// const models = require("../models/contact");
const { Contacts } = require("../models/contacts");

async function getContacts(req, res, next) {
  const { limit } = req.query;
  const contacts = await Contacts.find({ limit });
  return res.json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);

  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  return res.json(contact);
}

async function createContact(req, res, next) {
  const { name, email, phone, favorite } = req.body;

  const newContact = await Contacts.create({ name, email, phone, favorite });

  res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await Contacts.findById(contactId);

  if (!contact) {
    return next(HttpError(404, "Not found"));
  }

  await Contacts.findByIdAndRemove(contactId);
  return res.status(200).json({ message: "contact deleted" });
}

async function changeContact(req, res, next) {
  const { contactId } = req.params;
  const body = req.body;
  const changeContact = await Contacts.findByIdAndUpdate(contactId, body);

  if (!changeContact) {
    return next(HttpError(400, "missing fields"));
  }
  const contact = await Contacts.findById(contactId);

  return res.status(200).json(contact);
}

async function changeStatus(req, res, next) {
  const { contactId } = req.params;
  const body = req.body;
  const favorite = body.favorite;

  if (favorite === undefined) {
    return next(HttpError(400, "missing field favorite"));
  }

  const changeStatus = await Contacts.findByIdAndUpdate(contactId, {
    favorite,
  });

  if (!changeStatus) {
    return next(HttpError(404, "Not found"));
  }
  const contact = await Contacts.findById(contactId);

  return res.status(200).json(contact);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
  changeStatus,
};
