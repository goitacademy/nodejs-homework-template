const express = require("express");
const joi = require("joi");
const contacts = require("../../models/contacts");
const { HttpError } = require("../../utils");

const addSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json({
      code: 200,
      result: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await contacts.getContactById(req.params.contactId);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      code: 200,
      result: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = addSchema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const contact = await contacts.addContact(body);
    res.status(201).json({ code: 201, result: contact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContact = await contacts.removeContact(contactId);
    if (!removeContact) {
      throw HttpError(404, "Not found");
    }
    res.json({ code: 200, message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const putContact = await contacts.updateContact(contactId, req.body);
    if (!putContact) {
      throw HttpError(404, "Not found");
    }
    res.json({ code: 200, result: putContact });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
