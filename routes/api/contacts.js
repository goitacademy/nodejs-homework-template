const express = require("express");
const Joi = require("joi");

const contactsFetch = require("../../models/contacts");
const { HttpError } = require("../../utils/index");

const router = express.Router();
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsFetch.listContacts();

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsFetch.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found user with this ID!");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newConatct = req.body;
    const { error } = addSchema.validate(newConatct);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsFetch.addContact(newConatct);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const updateContact = req.body;
    const { error } = addSchema.validate(updateContact);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;

    const result = await contactsFetch.updateContact(contactId, updateContact);

    if (!result) {
      throw HttpError(404, "Not found user with this ID!");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsFetch.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found user with this ID!");
    }
    res.json({
      message: "Contact deleted success!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
