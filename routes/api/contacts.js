const express = require("express");
const Joi = require("joi");
const router = express.Router();
const contactsApi = require("../../models/contacts.js");
const HttpError = require("../../helpers/index.js");

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().required(),
});

router.get("/", async (_, res, next) => {
  try {
    const result = await contactsApi.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsApi.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `movie with id=${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsApi.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsApi.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }
    res.json({
      message: "Contact deleted",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsApi.upDateContactByid(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
