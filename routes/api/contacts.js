const express = require("express");
const Joi = require("joi");

const contactsServices = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsServices.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactsServices.getContactById(req.params.contactId);

    if (!contact) {
      throw HttpError(404, "Not found");
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) throw HttpError(400, "Missing required name field");

    const newContact = await contactsServices.addContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contactsServices.removeContact(req.params.contactId);

    if (!result) throw HttpError(404);

    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) throw HttpError(400, "Missing fields");

    const updatedContact = await contactsServices.updateContact(
      req.params.contactId,
      req.body
    );

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
