const express = require("express");
const contacts = require("../../models/contacts");
const CreateError = require("http-errors");
const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: Joi.number().required(),
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
      throw new CreateError(404, "Not found");
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
      throw new CreateError(400, "missing required name field");
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
    if (!resDelNewContact) {
      throw new CreateError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (e) {
    next(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const body = req.body;
  if (Object.keys(body).length == 0) {
    throw new CreateError(400, "missing fields");
  }
});

module.exports = router;
