const express = require("express");
const { nanoid } = require("nanoid");
const Joi = require("joi");
const router = express.Router();
const contacts = require("../../models/contacts");

// Схема валідації
const postSchema = Joi.object({
  name: Joi.required(),
  email: Joi.required(),
  phone: Joi.required(),
});

const putSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).or("name", "email", "phone");

router.get("/", async (req, res, next) => {
  const myContacts = await contacts
    .listContacts()
    .catch((e) => console.log(e.message));

  res.json({
    status: 200,
    data: myContacts,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactFound = await contacts
    .getContactById(contactId)
    .catch((e) => console.log(e.message));

  if (contactFound)
    res.json({
      status: 200,
      contactFound,
    });
  else
    res.status(404).json({
      status: 404,
      message: "Not found",
    });
});

router.post("/", async (req, res, next) => {
  const { error, value } = postSchema.validate(req.body);
  if (error)
    res.status(400).json({
      status: 400,
      message: "missing required name field",
    });
  else {
    const newContact = {
      id: nanoid(),
      ...value,
    };
    await contacts.addContact(newContact).catch((e) => console.log(e.message));
    res.status(201).json({
      status: 201,
      newContact,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactFound = await contacts
    .removeContact(contactId)
    .catch((e) => console.log(e.message));

  if (contactFound)
    res.json({
      status: 200,
      message: "contact deleted",
    });
  else
    res.status(404).json({
      status: 404,
      message: "Not found",
    });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
