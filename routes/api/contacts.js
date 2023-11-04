const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
router.get("/", async (req, res, next) => {
  try {
    const contactsList = await contacts.listContacts();
    console.log(contactsList);
    res.json(contactsList);
  } catch (error) {
    next(error);
  }
});
router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) {
      throw HttpError(404, "Not found");
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

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contacts.updateContact(req.params.contactId, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);

    console.log(result);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
