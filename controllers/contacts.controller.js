// const { HttpError } = require("../helpers/index");
const { NotFoundContact, FailedToUpdate } = require("../helpers/index");
const { Contact } = require("../models/contacts");

async function getContacts(req, res, next) {
  const { limit = 0 } = req.query;
  return res.status(200).json(await Contact.find({}).limit(limit));
}

async function getContact(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    // return next(HttpError(404, "Contact not found"));
    throw new NotFoundContact(`Contact with <${id}> not found`);
  }
  return res.status(200).json(contact);
}

async function createContact(req, res, next) {
  const newContact = await Contact.create(req.body);

  return res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    // return next(HttpError(404, "Contact not found"));
    throw new NotFoundContact(`Contact with <${id}> not found`);
  }
  return res
    .status(200)
    .json({ message: `Contact with name <${contact.name}> has been deleted` });
}

async function changeContact(req, res, next) {
  const { id } = req.params;
  if (!req.body) {
    throw new FailedToUpdate(`Missing field body`);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, res);
  if (!result) {
    // return next(HttpError(404, "Contact not found"));
    throw new NotFoundContact(`Contact with <${id}> not found`);
  }
  return res.status(200).json(result);
}

async function updateStatusContact(req, res, next) {
  const { id } = req.params;
  if (!req.body) {
    throw new FailedToUpdate(`Missing field favorite`);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, res);
  if (!result) {
    // return next(HttpError(404, "Contact not found"));
    throw new NotFoundContact(`Contact with <${id}> not found`);
  }
  return res.status(200).json(result);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
  updateStatusContact,
};
