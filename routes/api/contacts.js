const express = require("express");

const Joi = require("joi");

const contacts = require("../../models/contacts");

const router = express.Router();

const HttpError = require("../../helpers/HttpError");

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is a required field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is a required field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is a required field`,
  }),
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
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json({
      message: `Deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, `Missing required fields`);
    }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contacts.addContact(
      req.body.name,
      req.body.email,
      req.body.phone
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "missing fields");
    }
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
