const express = require("express");
const contacts = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

const postSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: [Joi.string().max(15), Joi.number()],
});

const putSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: [Joi.string().max(15), Joi.number()],
});

router.get("/", async (req, res, next) => {
  try {
    const listContacts = await contacts.listContacts();
    if (listContacts.length < 1) {
      return res.json({ message: "There is no contacts" });
    }
    res.json({ listContacts });
  } catch (error) {
    console.error(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact.length) {
      return res
        .status(400)
        .json({ message: `Contact with id ${contactId} not found` });
    }
    res.json({ contact });
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const validationResult = postSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }

    const addContact = await contacts.addContact(req.body);

    res.status(201).json({ addContact });
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContact = await contacts.removeContact(contactId);
    if (!removeContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    console.error(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!req.body) {
      return res.status(400).json({ message: "missing fields" });
    }
    const validationResult = putSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    const updateContact = await contacts.updateContact(contactId, req.body);
    if (!updateContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ updateContact });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
