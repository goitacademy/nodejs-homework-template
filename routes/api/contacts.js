const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { HttpError } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactsServisce = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsServisce.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServisce.getContactById(id);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
  } catch (error) {
    next(error);
  }
  const result = await contactsServisce.addContact(req.body);
  res.status(201).json(result);
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsServisce.removeContact(id);
    if (!result) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
  } catch (error) {
    next(error);
  }
  const { id } = req.params;
  const result = await contactsServisce.updateContact(id, req.body);

  if (!result) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  res.json(result);
});

module.exports = router;
