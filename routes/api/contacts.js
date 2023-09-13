const express = require("express");

const functions = require("../../models/functions-contacts");

const HttpError = require("../../Helpers/HttpError");
const Joi = require("joi");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().required(),
  favorite: Joi.bool,
});

// ------------------Get contacts------------------
router.get("/", async (req, res, next) => {
  try {
    const result = await functions.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// ------------------Find by ID------------------
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await functions.getContactById(contactId);
    if (!contact) {
      throw HttpError(404, "Not found user");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

// ------------------Add new contact------------------
router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await functions.addContact({ name, email, phone });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// ------------------Remove contact------------------
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await functions.removeContact(contactId);
    if (!contact) {
      throw HttpError(404, "Not found user");
    }

    console.log(res);
    res.status(200).send({ message: "contact deleted" }).json(contact);
  } catch (error) {
    next(error);
  }
});

// ------------------Update contact------------------
router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const contact = await functions.updateContact(contactId, {
      name,
      email,
      phone,
    });

    if (!contact) {
      throw HttpError(404, "Not found user");
    }

    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
