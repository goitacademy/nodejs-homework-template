const express = require("express");
const Joi = require("joi");

const router = express.Router();

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const addSchemma = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchemma.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.json({ message: "Delete success" });
  } catch (error) {}
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchemma.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateById(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
