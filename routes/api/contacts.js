const express = require("express");
const contactsOptions = require("../../models/contactsOptions");
const router = express.Router();
const Joi = require("joi");

const addValidate = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

const updateValidate = Joi.object({
  name: Joi.string().min(3).max(30),

  email: Joi.string(),
  phone: Joi.number(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOptions.listContacts();
    res.status(200).json(contacts);
  } catch (e) {
    res.status(204).json({ message: "No contacts" });
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactsOptions.getContactById(req.params.contactId);
    if (!contact) {
      throw new Error();
    }
    res.status(200).json(contact);
  } catch (e) {
    res.status(404).json({ message: "Not found" });
    next(e);
  }
});
router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = addValidate.validate(req.body);

  try {
    if (error) {
      throw new Error(error.message);
    }
    const contact = await contactsOptions.addContact(name, email, phone);
    if (!contact) {
      throw new Error("Contact with this name has already been in contacts");
    }
    res.status(201).json({ contact: contact });
  } catch (e) {
    res.status(400).json({ message: e.message });
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactsOptions.removeContact(req.params.contactId);
    if (!contact) {
      throw new Error();
    }
    res.status(200).json({ message: "contact deleted" });
  } catch {
    res.status(404).json({ message: "Not found" });
    next();
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error, value } = updateValidate.validate(req.body);
  try {
    if (error || Object.keys(value).length === 0) {
      const message = error ? error.message : "missing fields";
      res.status(400).json(message);
      return;
    }
    const contact = await contactsOptions.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact === null) {
      throw new Error("Not found");
    }
    res.json(contact);
  } catch (e) {
    res.status(404).json({ message: e.message });
    next(e);
  }
});

module.exports = router;
