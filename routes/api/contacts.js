const express = require("express");
const Joi = require("joi");

const router = express.Router();
const contactsFoo = require("../../models/contacts");

const newContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required email field`,
  }),
  email: Joi.string().required().email().messages({
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required email field`,
  }),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
})
  .required()
  .min(1)
  .messages({
    "object.min": "missing fields",
  });

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsFoo.listContacts();
    console.log(contacts);
    res.status(200).json(contacts);
  } catch (error) {
    console.log("Error...try later");
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsFoo.getContactById(contactId);
    if (contact) {
      console.log(contact);
      res.status(200).json(contact);
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log("Error...try later");
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const value = newContactSchema.validate(req.body);
    if (typeof value.error !== "undefined") {
      return res.status(400).json({ message: value.error.details[0].message });
    }
    const result = await contactsFoo.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log("Error...try later");
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsFoo.removeContact(contactId);
    if (contact) {
      console.log(contact);
      res.status(200).json({ message: "Contact deleted" });
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log("Error...try later");
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const value = contactUpdateSchema.validate(req.body);
    if (typeof value.error !== "undefined") {
      return res.status(400).json({ message: value.error.details[0].message });
    }
    const { contactId } = req.params;

    const result = await contactsFoo.updateContact(contactId, req.body);
    if (!result) {
      return res.status(400).json({ message: "missing fields" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
