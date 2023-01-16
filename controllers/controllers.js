const { Contacts } = require("../db/contactsModel");
const { HttpError } = require("../helpers/index");

async function getContacts(req, res) {
  const contacts = await Contacts.find();
  res.json({ contacts });
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const result = await Contacts.findById(contactId);
  if (!result) {
    return next(HttpError(404, "Contact not found"));
  }
  res.json({
    message: "contact found",
    contact: result,
  });
}

async function createContact(req, res, next) {
  const { name, email, phone } = req.body;
  const newContact = await new Contacts({ name, email, phone });
  await newContact.save();
  res.status(201).json(newContact);
}

async function deleteContact(req, res) {
  const { contactId } = req.params;
  const result = await Contacts.findByIdAndRemove(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
}

async function updateContacts(req, res, next) {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const upContact = await Contacts.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });
  if (!upContact) {
    res.status(400).json({ message: "Not found" });
  }
  res.status(200).json(upContact);
}

async function favoriteChange(req, res, next) {
  const { name, email, phone, favorite = false } = req.body;
  const { contactId } = req.params;
  const upFavorite = await Contacts.findByIdAndUpdate(contactId, {
    $set: { name, email, phone, favorite },
  });
  if (!upFavorite) {
    res.status(400).json({ message: "Not found" });
  }
  res.status(200).json(upFavorite);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContacts,
  favoriteChange,
};
