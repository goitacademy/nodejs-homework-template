const express = require("express");

const contacts = require("../../models/contacts");

const router = express.Router();

const Joi = require("joi");
const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const { RequestError } = require("../../helpers");

router.get("/", async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw RequestError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing required name field");
    }

    const result = await contacts.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);

    if (error) {
      throw RequestError(400, "missing required name field");
    }

    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);

    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
