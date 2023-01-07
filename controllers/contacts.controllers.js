const { httpError } = require("../helpers/index");
const db = require("../models/contacts.js");
const Joi = require("joi");
async function getContacts(req, res, next) {
  const contacts = await db.listContacts();
  if (!contacts) {
    return next(httpError(404, "Contacts not found"));
  }
  res.status(200).json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await db.getContactById(contactId);

  if (!contact) {
    return next(httpError(404, "Contact not found"));
  }
  return res.json(contact);
}

async function createContact(req, res, next) {
  const { body } = await req;

  const newContact = await db.addContact(body);
  res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await db.getContactById(contactId);

  if (!contact) {
    next(httpError(404, "Requested contact (id) is not present in database"));
  }
  await db.removeContact(contactId);
  res.status(200).json(`contact deleted`);
}

async function changeContact(req, res, next) {
  const { contactId } = req.params;
  const { body } = await req;
  if (!body) {
    return next(httpError(400, "missing fields"));
  }
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().min(10).required(),
  });
  schema.validate(body);
  const { error } = schema.validate(body);

  if (error) {
    return next(httpError(404, error.message));
  }

  const updatedContact = await db.updateContact(contactId, body);
  res.status(200).json(updatedContact);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  changeContact,
};
