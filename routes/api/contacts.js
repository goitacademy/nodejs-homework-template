const express = require("express");
const Joi = require("joi");
const contactsServices = require("../../models/contacts");

const router = express.Router();
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^\+380 \d{2} \d{3} \d{4}$/)
    .required(),
});

router.get("/", async (req, res, next) => {
  try {
    const data = await contactsServices.listContacts();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contactsServices.getContactById(contactId);

    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error: validationResult } = schema.validate(req.body);

    if (validationResult) {
      const error = new Error(validationResult.message);
      error.status = 400;
      throw error;
    }

    const data = await contactsServices.addContact(req.body);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactsServices.removeContact(contactId);

    if (!deletedContact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error: validationResult } = schema.validate(req.body);

    if (validationResult) {
      const error = new Error(validationResult.message);
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const data = await contactsServices.updateContact(contactId, req.body);

    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
