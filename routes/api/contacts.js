const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const router = express.Router();

const { httpErr } = require("../../helpers/HtppError");

const addSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["net", "com"] },
  }),
  phone: Joi.string().pattern(/^\d+$/),
});

const addSchemaReq = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["net", "com"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/, "numbers")
    .required(),
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      throw httpErr(404, "Not found");
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchemaReq.validate(req.body);
    if (error) {
      throw httpErr(400, error.message);
    }
    const { name, email, phone } = req.body;
    const newContact = await contacts.addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContact = await contacts.removeContact(contactId);
    if (!removeContact) {
      throw httpErr(404, "Not Found");
    }
    res.json({ message: "Delete success" });
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length < 1) {
      return res.status(400).json({ message: "missing fields" });
    }

    const { error, value } = addSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Validation error", details: error.details });
    }

    const { contactId } = req.params;
    const updateContactId = await contacts.updateContact(contactId, req.body);
    res.json(updateContactId);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
