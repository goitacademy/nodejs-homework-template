const express = require("express");
const router = express.Router();
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
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

const contactsOpt = require("../../models/contacts.js");

router.get("/", async (_req, res, next) => {
  try {
    const contacts = await contactsOpt.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsOpt.getContactById(contactId);

    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const response = contactSchema.validate(req.body, { abortEarly: false });

    if (typeof response.error !== "undefined") {
      return res
        .status(400)
        .json({ message: response.error.details[0].message });
    }

    const result = await contactsOpt.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    console.log(contactId);

    const result = await contactsOpt.removeContact(contactId);

    console.log(result);

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const response = contactUpdateSchema.validate(req.body, {
      abortEarly: false,
    });

    if (typeof response.error !== "undefined") {
      return res
        .status(400)
        .json({ message: response.error.details[0].message });
    }

    const { contactId } = req.params;
    const result = await contactsOpt.updateContact(contactId, req.body);

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
