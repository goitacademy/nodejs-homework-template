const express = require("express");

const router = express.Router();

const Joi = require("joi");

const { createError } = require("../../helpers");

const { createContact } = require("../../services");

const {
  listContacts,
  getContactById,
  removeContact,
  // addContact,
  updateContact,
} = require("../../models/contacts.js");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      throw createError(404, "Contact not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);

    if (error) {
      throw createError(error.message, "missing required name field");
    }
    const contact = await createContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);

    if (!contact) {
      throw createError(404, "Contact not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    //
    if (error) {
      throw createError(400, "missing fields");
    }
    const { name, email, phone } = req.body;
    const contact = await updateContact(
      req.params.contactId,
      name,
      email,
      phone
    );
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
