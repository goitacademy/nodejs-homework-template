const express = require("express");
const router = express.Router();
const Joi = require("joi");

const contacts = require("../../models/contacts");
const HttpError = require("../../utils/HttpError");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const contactById = await contacts.getContactById(id);

    if (!contactById) {
      throw HttpError(404, "Not found");
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    console.log(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const addedContact = await contacts.addContact(req.body);
    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const removedContact = await contacts.removeContact(id);

    if (!removedContact) {
      throw HttpError(404, "Not found");
    }

    res.json({ message: "Succesfully deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = contactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const editedContact = await contacts.updateContact(id, req.body);

    if (!editedContact) {
      throw HttpError(404, "Not found");
    }

    res.json(editedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
