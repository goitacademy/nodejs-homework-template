const express = require("express");
const contacts = require("../../models/contacts");
const Joi = require("joi");
const HttpError = require("../../utils/HttpError");

const router = express.Router();
const addSchema = Joi.object({
  name: Joi.string()
    .min(5)
    .max(20)
    .pattern(/^[A-Z]+[a-z]+ [A-Z]+[a-z]+$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^([(]\d{3}[)])+ \d{3}-\d{4}$/)
    .required(),
});

router.get("/", async (req, res, next) => {
  try {
    const listContacts = await contacts.listContacts();
    res.status(200).json(listContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contacts.getContactById(contactId);
    if (!contactById) throw HttpError(404, "Not Found");

    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = addSchema.validate({ name, email, phone });
    if (error) throw HttpError(400, "missing required name field");

    const addedContact = await contacts.addContact({ name, email, phone });
    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contacts.removeContact(contactId);
    if (!removedContact) throw HttpError(404, "Not found");

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = addSchema.validate({ name, email, phone });
    if (error) throw HttpError(400, "missing fields");

    const { contactId } = req.params;
    const updatedContact = await contacts.updateContact(contactId, {
      name,
      email,
      phone,
    });
    if (!updatedContact) throw HttpError(404, "Not found");

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
