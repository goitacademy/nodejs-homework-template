const express = require("express");
const Joi = require("joi");

const contactService = require("../../models/index.js");
const HttpError = require("../../helpers/HttpError.js");

const router = express.Router();

const contactSchema = Joi.object({
  id: Joi.any(),
  name: Joi.string().required().messages({
    "any.required": `missing required field "title"`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required field "email"`,
  }),
  phone: Joi.number().required().messages({
    "any.required": `missing required field "phone"`,
  }),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactService.getById(id);
    if (!result) {
      throw HttpError(404, `Not found with id: ${id}`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields are empty!");
    }

    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields are empty!");
    }

    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await contactService.updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404, `The contact with ${contactId} is not found.`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `The contact with ${contactId} is not found.`);
    }

    res.json({
      message: "Delete is successful",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
