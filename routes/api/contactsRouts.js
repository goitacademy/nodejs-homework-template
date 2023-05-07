const express = require("express");
const router = express.Router();
const { HttpError } = require("../../helpers");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const Joi = require("joi");
const schemaJoi = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.alternatives([Joi.string(), Joi.number()]),
});

router.get("/", async (req, res, next) => {
  try {
    const answer = await listContacts();
    res.json(answer);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const answer = await getContactById(contactId);
    if (!answer) {
      throw HttpError(404);
    }
    res.json(answer);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { err } = await schemaJoi.validateAsync(req.body);
    if (err) {
      throw HttpError(400, `missing required name field`);
    }
    const answer = await addContact(req.body);
    res.status(201).json(answer);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const answer = await removeContact(contactId);
    if (!answer) {
      throw HttpError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { err } = await schemaJoi.validateAsync(req.body);
    if (err) {
      throw HttpError(400, `missing fields`);
    }
    const answer = await updateContact(contactId, req.body);
    if (!answer) {
      throw HttpError(404);
    }
    res.json(answer);
  } catch (error) {
     next(error);
  }
});

module.exports = router;
