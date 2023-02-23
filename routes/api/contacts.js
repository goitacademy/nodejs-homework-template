const express = require("express");
const Joi = require("joi");

const router = express.Router();

const contacts = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const HttpError = require("../../helpers/httpError");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    return res.json(result);
  } catch (error) {
    res.status(500).json({ massage: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId);
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    console.log(req.body);
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contacts.removeContact(contactId);
    if (!deleteContact) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const { contactId } = req.params;
    const newContact = await contacts.updateById(contactId, req.body);
    if (!newContact) {
      throw HttpError(404, "Not found");
    }
    res.json(newContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
