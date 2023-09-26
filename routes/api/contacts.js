const express = require("express");
const Joi = require("joi");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers/HttpError");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
    res.status(200);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
    res.status(200);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.query);

    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contacts.addContact(req.query);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);

    if (!result) {
      throw HttpError(404, "Not Found");
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.query);

    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contacts.updateContact(
      req.params.contactId,
      req.query
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
