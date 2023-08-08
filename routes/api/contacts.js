const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const router = express.Router();

const { httpErr } = require("../../helpers/HtppError");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["net", "com"] },
  }).required(),
  phone: Joi.string().pattern(/^[0-9]+$/, "numbers").required(),
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
    const { err } = addSchema.validate(req.body);
    if (err) {
      throw httpErr(400, err.message);
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
      throw httpErr(404,"Not Found");
    }
        res.json({message: "Delete success"});
                } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
    try {
    const { err } = addSchema.validate(req.body);
    if (err) {
      throw httpErr(400, err.message);
    }
  const { contactId } = req.params;
  const updateContactId = await contacts.updateContact(contactId, req.body);
      res.json(updateContactId);
        } catch (err) {
    next(err);
  }
});

module.exports = router;