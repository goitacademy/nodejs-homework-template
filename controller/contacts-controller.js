const express = require("express");
const { HttpError } = require("../helpers/index");

const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

async function getContact(req, res, next) {
  res.status(200).json(await listContacts());
}

async function getContactId(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  return res.status(200).json(contact);
}

async function addNewContact(req, res, next) {
  const { name, email, phone } = req.body;
  console.log("newContact", { name, email, phone });
  const addContacts = await addContact(name, email, phone);
  res.status(201).json(addContacts);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  await removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
}

async function updteContact(req, res, next) {
  const { contactId } = req.params;
  const updateContac = await updateContact(contactId, req.body);
  if (!updateContac) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "OK" });
}

module.exports = {
  getContact,
  getContactId,
  addNewContact,
  deleteContact,
  updteContact,
};
