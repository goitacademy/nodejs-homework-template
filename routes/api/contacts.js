const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const contactsOperation = require("../../model/index");
const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contacts = await contactsOperation.getContactById(Number(contactId));
    if (!contacts) {
      throw new createError(404, "Not found");
    }
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await contactsOperation.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContacts = await contactsOperation.removeContact(contactId);
    if (!deleteContacts) {
      throw new createError(404, "Not found");
    }
    res.json({ message: "contact delete" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updateContacts = await contactsOperation.updateContact({
      contactId,
      ...req.body,
    });
    if (!updateContacts) {
      throw new createError(404, "Not found");
    }
    res.json(updateContacts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
