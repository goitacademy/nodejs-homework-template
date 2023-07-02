const express = require("express");
const Joi = require("joi");

const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await getContactById(contactId);
    if (!result) {
      res.json({ message: "Not found", status: 404 });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.json({ message: "missing required name field", status: 400 });
  } else {
    try {
      const result = await addContact(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await removeContact(contactId);
    if (!result) {
      res.json({ message: "Not found", status: 404 });
    } else {
      res.json({ message: "contact deleted", status: 200 });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.json({ message: "missing fields", status: 400 });
    }
    const result = await updateContact(contactId, req.body);
    if (!result) {
      res.json({ message: "Not found", status: 404 });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
