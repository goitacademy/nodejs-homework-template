const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts.js");

const { HttpError } = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
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
    console.log(req.params);
    const { id } = req.params;
    const contact = await contacts.getContactById(id);
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
    const { error } = addSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].path);
      throw HttpError(
        400,
        `missing required ${error.details[0].path.toString()} field`
      );
    }
    const contactToCreate = await contacts.addContact(req.body);
    res.status(201).json(contactToCreate);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactToRemove = await contacts.removeContact(id);

    if (!contactToRemove) {
      throw HttpError(404, "Not found");
    }

    res.json({ message: "Contact removed successfully" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, `missing fields`);
    }

    const { id } = req.params;
    const updatedContact = await contacts.updateContact(id, req.body);

    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
