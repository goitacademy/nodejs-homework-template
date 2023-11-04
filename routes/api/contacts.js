const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact === null) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).max(15).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (contact === null) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string().min(10).max(15),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }
    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);
    if (contact) {
      res.status(200).json(contact);
    }
    return res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
