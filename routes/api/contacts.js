const express = require("express");

const router = express.Router();
const contactsService = require("../../models/contacts.js");

const HttpError = require("../../helpers/index.js");
const Joi = require("joi");

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const results = await contactsService.listContacts();
    res.json(results);
  } catch (error) {}
});

router.get("/:contactId", async (req, res, next) => {
  try {
    // console.log(req.params);
    const { contactId } = req.params;
    const results = await contactsService.getContactById(contactId);

    if (!results) {
      console.log(HttpError);
      throw HttpError(404, `Not found`);
    }
    res.json(results);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const results = await contactsService.addContact(req.body);
    res.status(201).json(results);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const results = await contactsService.removeContact(contactId);
    if (!results) {
      throw HttpError(404, `Contact with ID="${contactId} not found"`);
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    console.log(contactId);
    const results = await contactsService.updateContact(contactId, req.body);
    if (!results) {
      console.log(HttpError);
      throw HttpError(404, `Not found`);
    }

    res.json(results);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
