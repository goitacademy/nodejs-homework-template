const express = require("express");

const router = express.Router();
const contacts = require("../../models/contacts");
const Joi = require("joi");
const { HttpError } = require("../../helpers");

const addSchemaforPost = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const addSchemaforPut = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
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
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchemaforPost.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
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
    result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = addSchemaforPut.validate(req.body);
    const length = Object.keys(req.body).length;

    if (length === 0) {
      throw HttpError(400, "No body");
    }

    if (error) {
      throw HttpError(400, "missing fields");
    }

    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;