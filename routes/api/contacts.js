const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");
const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.json(result);
    res.status(200);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "Missing required name field");
    }

    const result = await contacts.addContact(req.body);
    if (!result) {
      throw RequestError(404, "Error occured");
    }

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

    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "Missing fields");
    }
    const { contactId } = req.params;
    const body = req.body;
    const result = await contacts.updateContact(contactId, body);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({
      message: "Contact updated",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
