const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");

const express = require("express");

const router = express.Router();

const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
});

router.get("/:contactId", async (req, res) => {
  const result = await getContactById(req.params.contactId);
  if (!result) {
    res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(result);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  const { error } = contactSchema.validate({ name, email, phone });

  if (error) {
    return res
      .status(400)
      .json({ message: "Validation error", details: error.details });
  }

  try {
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;

  try {
    const result = await removeContact(contactId);
    if (result) {
      res.status(200).json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const { name, email, phone } = req.body;

  const { error } = contactSchema.validate({ name, email, phone });

  if (error) {
    return res
      .status(400)
      .json({ message: "Validation error", details: error.details });
  }

  try {
    const updatedContact = await updateContact(contactId, {
      name,
      email,
      phone,
    });
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
