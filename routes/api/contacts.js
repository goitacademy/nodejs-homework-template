/** @format */

const express = require("express");
const RequestError = require("../../helpers");
const joi = require("joi");

const Contact = require('../../models/contact')

const router = express.Router();

const contactShema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi
    .string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "string.pattern.base":
        "Invalid phone number format. The format should be (XXX) XXX-XXXX",
    })
    .required(),
});

const contactsUpdateSchema =  joi.object({
  name: joi.string().min(1).max(30).optional(),
  email: joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  phone: joi.string().min(1).max(30).optional(),
  favorite: joi.boolean(),
});

const contactUpdateFavoriteSchema = joi.object({
  favorite: joi.boolean().required(),
})


router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId)
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactShema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await Contact.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "Missing field favorite");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsUpdateSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw RequestError(404, `Not found contact ${contactId}`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;


