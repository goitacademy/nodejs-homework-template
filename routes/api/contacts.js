const express = require("express");
const Joi = require("joi");

const postContactSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-z A-Z]{2,30}$/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]{10,15}$/)
    .required(),
});

const putContactSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-z A-Z]{2,30}$/)
    .optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  phone: Joi.string()
    .regex(/^[0-9]{10,15}$/)
    .optional(),
});

const contactsOperations = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      res.status(404).json(` id=${contactId} not found`);
    }
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = postContactSchema.validate(req.body);
    if (error) {
      res.status(400).json(` Missing required name field`);
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = putContactSchema.validate(req.body);
    if (error) {
      res.status(400).json(` Missing  fields`);
      throw error;
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContactById(
      contactId,
      req.body
    );
    if (!result) {
      res.status(404).json(`Not found`);
    }
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      res.status(404).json(`Not found`);
    }
    res.status(200).json({
      result,
      message: `Contact deleted`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
