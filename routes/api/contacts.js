const express = require("express");
const Joi = require('@hapi/joi');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().alphanum(),
  email: Joi.string().email(),
  phone: Joi.string()
});

router.get("/", async (req, res, next) => {
  await listContacts()
    .then((contacts) => res.json(contacts))
    .catch((error) => console.log(error.message));
});

router.get("/:contactId", async (req, res, next) => {
  const {contactId} = req.params;
  await getContactById(contactId).then(contact =>
    res.json(contact)
  ).catch(error => console.log(error.message))
});

router.post("/", async (req, res, next) => {
  const body = schema.validate(req.body);
  if(body.error) {
    res.json({message: body.error.message, status: "error", code: 400})
  } else {
  await addContact(body).then(contact => 
    res.json(contact)
  ).catch(error => console.log(error.message))}
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  await removeContact(contactId).then(
    message => res.json(message)
  ).catch(error => console.log(error.message))
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = schema.validate(req.body);
  if(body.error) {
    res.json({message: body.error.message, status: "error", code: 400})
  } else {
  await updateContact(contactId, body.value).then(contact => 
    res.json(contact)
  ).catch(error => console.log(error.message))}
});

module.exports = router;
