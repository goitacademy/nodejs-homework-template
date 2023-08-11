const express = require("express");
const router = express.Router();
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const allContact = await contacts.listContacts();
    res.status(200).json(allContact);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const getContact = await contacts.getContactById(contactId);
    if (!getContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(getContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const addContact = await contacts.addContact(req.body);
    res.status(201).json(addContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const deleteContacts = await contacts.removeContact(req.params.contactId);
    if (!deleteContacts) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addShema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const update = await contacts.updateContact(req.params.contactId, req.body);
    if (!update) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "update was successful" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
