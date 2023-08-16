const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const router = express.Router();

const { httpError } = require("../../helpers/HttpError");

const addSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["net", "com"] },
  }),
  phone: Joi.string().pattern(/^\d+$/),
  favorite: Joi.boolean(),
});

const addSchemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),
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
  favorite: Joi.boolean(),
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
      console.error(error);
      next(error)
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
      console.error(error);
      next(error)
    }
    const { name, email, phone, favorite = false } = req.body;
    const newContact = await contacts.addContact({ name, email, phone, favorite});
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
      console.error(error);
      next(error)
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

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length < 1) {
      return res.status(400).json({ message: "missing fields" });
    }

    const { error, value } = addSchemaFavorite.validate(req.body);
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
