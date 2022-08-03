const express = require('express')
const Joi = require("joi");
const router = express.Router()

const Contact = require("../../models/contacts");
const { createError } = require("../../helpers");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});



router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId);
    const result = await Contact.getContactById(contactId);
    if (!result) {
      throw createError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/",  async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.addContact({ ...req.body});
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.removeContact(contactId);
    if (!result) {
      throw createError(404, "Not Found");
    }
    res.json({ message: "Contact Deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await Contact.updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, "Not Found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router
