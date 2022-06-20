const express = require("express");
const router = express.Router();
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().required(),
});

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const { createError } = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    res.json(await listContacts());
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw createError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, "Missing required name field");
    }
    const contact = await addContact(req.body);
    if (!contact) {
      throw createError(404);
    }
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, "Missing required name field");
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
