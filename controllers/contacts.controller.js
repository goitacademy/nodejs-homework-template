const createError = require("http-errors");
const { Contact } = require("../models/contacts");

async function getContacts(req, res, next) {
  const { limit = 20, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  return res.status(200).json(await Contact.find({}).skip(skip).limit(limit)); // example: 127.0.0.1:3000/api/contacts?page=4&limit=3
  // const { limit = 20, page = 1, favorite = true } = req.query;
  // const skip = (page - 1) * limit;
  // return res
  //   .status(200)
  //   .json(await Contact.find({}).skip(skip).limit(limit).favorite(favorite));
}

// async function getFavoriteContacts(req, res, next) {
//   const { favorite = true } = req.query;
//   return res.status(200).json(await Contact.find({}).favorite(favorite)); // example: 127.0.0.1:3000/api/contacts?page=4&limit=3
// }

async function getContact(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw createError.NotFound(`Contact with <${id}> not found`);
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
    throw createError.NotFound(`Contact with <${id}> not found`);
  }
  return res
    .status(200)
    .json({ message: `Contact with name <${contact.name}> has been deleted` });
}

async function changeContact(req, res, next) {
  const { id } = req.params;
  if (!req.body) {
    throw createError.BadRequest(`Missing field body`);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, res);
  if (!result) {
    throw createError.NotFound(`Contact with <${id}> not found`);
  }
  return res.status(200).json(result);
}

async function updateStatusContact(req, res, next) {
  const { id } = req.params;
  if (!req.body) {
    throw createError.BadRequest(`Missing field favorite`);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, res);
  if (!result) {
    throw createError.NotFound(`Contact with <${id}> not found`);
  }
  return res.status(200).json(result);
}

module.exports = {
  getContacts,
  // getFavoriteContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
  updateStatusContact,
};
