const { NotFound, BadRequest } = require('http-errors');
const { boolean } = require('joi');
const { Contact } = require('../models/contacts');

// TODO: fix bug, find({favorite}) коли не вказувати у query favorite=true/false
// => повертає тільки контакти із значенням false
async function getContacts(req, res, next) {
  const { limit = 20, page = 1, favorite = null } = req.query;
  // const search = req.query.search || ''; // example
  // .find({name: { $regex: search, $options: 'i' },}) // example
  const skip = (page - 1) * limit;
  return res
    .status(200)
    .json(await Contact.find({ favorite }).skip(skip).limit(limit)); // example: 127.0.0.1:3000/api/contacts?page=4&limit=3
}

async function getContact(req, res, next) {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw NotFound(`Contact with <${id}> not found`);
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
    throw NotFound(`Contact with <${id}> not found`);
  }
  return res
    .status(200)
    .json({ message: `Contact with name <${contact.name}> has been deleted` });
}

async function changeContact(req, res, next) {
  const { id } = req.params;
  if (!req.body) {
    throw BadRequest(`Missing field body`);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, res);
  if (!result) {
    throw NotFound(`Contact with <${id}> not found`);
  }
  return res.status(200).json(result);
}

async function updateStatusContact(req, res, next) {
  const { id } = req.params;
  if (!req.body) {
    throw BadRequest(`Missing field favorite`);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, res);
  if (!result) {
    throw NotFound(`Contact with <${id}> not found`);
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
