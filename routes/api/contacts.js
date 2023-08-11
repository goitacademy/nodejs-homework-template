const express = require("express");
const Joi = require("joi");

const contactsOperations = require("../../models/contacts");

const router = express.Router();
const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(4).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({ status: "success", code: 200, data: { result: contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      const error = new Error("Not found contact");
      error.status = 404;
      throw error;
    }
    res.json({ status: "success", code: 200, data: { result: contact } });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({ status: "success", code: 201, data: { result } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);

    if (!result) {
      const error = new Error("Not found contact");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;

    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      const error = new Error("Not found contact");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
