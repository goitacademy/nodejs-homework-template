const express = require("express");

const router = express.Router();

const operations = require("../../models/contacts");
const Joi = require("joi");
const { httpError } = require("../../helpers");
const contactPush = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
router.get("/", async (req, res, next) => {
  try {
    const result = await operations.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await operations.getContactById(contactId);
    if (!contactById) {
      throw httpError(404);
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactPush.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    const result = await operations.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});
// ! доробити
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await operations.removeContact(contactId);
    res.json({ message: "contact deleted" });
  } catch (error) {}
});
// ! доробити^^^

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactPush.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await operations.updateContact(contactId, req.body);
    if (!result) {
      throw httpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
