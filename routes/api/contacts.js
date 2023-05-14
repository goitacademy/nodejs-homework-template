const express = require("express");
const Joi = require("joi");

const contactService = require("../../models");

const { HttpError } = require("../../helpers");

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contactService.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactById = await contactService.getById(id);

    if (!contactById) {
      throw HttpError(404, `Contacts with id : ${id} not found`);
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);

    const { name, email, phone } = req.body;
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await contactService.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const delContact = await contactService.removeContact(contactId);
    if (!delContact) {
      throw HttpError(404, `Contacts with id : ${contactId} not found`);
    }

    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { name, email, phone } = req.body;
    const { contactId } = req.params;
    const newContact = await contactService.updateContact(
      contactId,
      name,
      email,
      phone
    );
    if (!newContact) {
      throw HttpError(404, `Contacts with id : ${contactId} not found`);
    }
    res.json(newContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
