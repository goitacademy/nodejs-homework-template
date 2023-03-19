const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).max(22).required(),
});
const changeContactShema = Joi.object({
  name: Joi.string().alphanum().min(3).max(50),
  email: Joi.string().email(),
  phone: Joi.string().min(6).max(22),
}).or("name", "email", "phone");

router.get("/", async (req, res, next) => {
  const contactsList = await listContacts();
  res.json(contactsList);
});

router.get("/:contactId", async (req, res, next) => {
  const foundContact = await getContactById(req.params.contactId);
  if (foundContact === undefined) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(foundContact);
  }
});

router.post("/", async (req, res, next) => {
  if (addContactSchema.validate(req.body).error) {
    res.json({
      message: addContactSchema.validate(req.body).error.details[0].message,
    });
  } else {
    const message = await addContact(req.body);
    res.status(201).json(message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const foundContact = await getContactById(req.params.contactId);
  if (foundContact === undefined) {
    res.status(404).json({ message: "Not found" });
  } else {
    await removeContact(req.params.contactId);
    res.json({ message: "contact deleted" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const foundContact = await getContactById(req.params.contactId);
  const error = changeContactShema.validate(req.body).error;
  if (!error) {
    const editedContact = await updateContact(req.params.contactId, req.body);
    res.json(editedContact);
  } else if (foundContact === undefined) {
    res.status(404).json({ message: "Not found" });
  } else if (error.details[0].type === "object.missing") {
    res.status(400).json({ message: "missing fields" });
  } else if (error.details[0].type === "object.unknown") {
    res.status(404).json({
      message: error.details[0].message,
    });
  }
});

module.exports = router;
