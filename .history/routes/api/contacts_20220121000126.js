const express = require("express");
const contacts = require("../../models/contacts");
const createError = require("http-errors");
const joi = require("joi");

const addContactSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: joi.number().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resContactById = await contacts.getContactById(contactId);

    if (!resContactById) {
      throw new createError(404, "Not found");
    }
    res.json(resContactById);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const resAddNewContact = await contacts.addContact(req.body);
    res.status(201).json(resAddNewContact);
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resDelNewContact = await contacts.removeContact(contactId);
    res.json({ message: "contact deleted" });
  } catch (e) {
    next(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
