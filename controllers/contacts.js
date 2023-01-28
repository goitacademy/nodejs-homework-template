const { HttpError } = require("../helpers");
const models = require("../models/contacts");
// const Joi = require("joi");

async function getContacts(req, res, next) {
  const { limit } = req.query;
  const contacts = await models.listContacts({ limit });
  return res.json(contacts);
}

async function getContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await models.getContactById(contactId);
  console.log("HttpError", HttpError(404, "Not found"));

  if (!contact) {
    return next(HttpError(404, "Not found"));
    // return res.status(404).json("Not found");
  }
  return res.json(contact);
}

async function createContact(req, res) {
  const { title } = req.body;
  console.log("title :", title);
  console.log("body :", req.body);

  const newContact = await models.addContact({ title: "fff" });

  res.status(201).json(newContact);
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;
  const contact = await models.getContactById(contactId);

  if (!contact) {
    return next(HttpError(404, "Not found"));
    // return res.status(404).json("Not found");
  }

  await models.removeContact(contactId);

  return res.status(200).json(contact);
}

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

module.exports = { getContacts, getContact, createContact, deleteContact };
