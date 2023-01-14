const { HttpError } = require("../helpers/index");
// const Joi = require("joi");

// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../models/contacts");
const { Contact } = require("../models/contacts");

async function getContacts(req, res, next) {
  // const { limit } = req.query;
  // return res.status(200).json(await listContacts({ limit }));
  return res.status(200).json(await Contact.find({}));
}

async function getContact(req, res, next) {
  const { id } = req.params;
  // const contact = await getContactById(id);
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  return res.status(200).json(contact);
}

async function createContact(req, res, next) {
  // const newContact = await addContact(req.body);
  const newContact = await Contact.create(req.body);

  return res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { id } = req.params;
  // const contact = await getContactById(id);
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  // await removeContact(id);
  await Contact.findByIdAndRemove(id);
  return res.status(200).json({ contact, message: "contact deleted" });
}

async function changeContact(req, res, next) {
  const { id } = req.params;
  // const result = await updateContact(id, req.body, res);
  const result = await Contact.findByIdAndUpdate(id, req.body, res);
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  return res.status(200).json(result);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
};
