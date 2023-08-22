const express = require("express");
const Joi = require("joi");
const crypto = require("crypto");

const contactsOperations = require("../../models/contacts");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
  res.status(200).json({
    status: "success",
    code: 200,
    data: { contacts },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const foundedContact = await contactsOperations.getContactById(contactId);
  if (!foundedContact) {
    return res.status(404).json({
      code: 404,
      message: "Not found",
    });
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: { foundedContact },
  });
});

router.post("/", async (req, res, next) => {
  const contact = req.body;
  const { error } = contactSchema.validate(contact);
  if (error) {
    res.status(400).json({
      code: 400,
      message: "missing required name field",
    });
  }
  const newContact = { ...contact, id: crypto.randomUUID() };
  await contactsOperations.addContact(newContact);
  res.status(201).json({
    status: "success",
    code: 201,
    data: newContact,
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const foundedContact = await contactsOperations.getContactById(contactId);
  if (!foundedContact) {
    return res.status(404).json({
      code: 404,
      message: "Not found",
    });
  }
  await contactsOperations.removeContact(contactId);
  res
    .status(200)
    .json({ status: "success", message: "contact deleted", code: 200 });
});

router.put("/:contactId", async (req, res, next) => {
  const contact = req.body;
  const { error } = contactSchema.validate(contact);
  if (error) {
    res.status(400).json({
      code: 400,
      message: "missing fields",
    });
  }
  const contactId = req.params.contactId;
  const foundedContact = await contactsOperations.getContactById(contactId);
  if (!foundedContact) {
    return res.status(404).json({
      code: 404,
      message: "Not found",
    });
  }
  const newContact = await contactsOperations.updateContact(contactId, contact);
  res.status(200).json({ status: "success", code: 200, data: newContact });
});

module.exports = router;
