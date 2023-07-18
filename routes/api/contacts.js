const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const contacts = require("../../models/contacts");
const { HttpError } = require("../../utils");
const Joi = require("joi");

const reqSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = reqSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const id = crypto.randomBytes(16).toString("hex");
    const result = await contacts.addContact(id, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) throw HttpError(400, "Not found");
    res.status(200).json({ message: "Contact successfully deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = reqSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) throw HttpError(400, "Not found");
    res.status(200).json(...result);
    console.log(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
