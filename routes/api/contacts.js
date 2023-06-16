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
    const resultContacts = await contacts.listContacts();
    res.json(resultContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resultContact = await contacts.getContactById(contactId);
    if (!resultContact) {
      throw HttpError(404, "Not found");
    }
    res.json(resultContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const requiredFields = [];

    if (!name) {
      requiredFields.push("name");
    }
    if (!email) {
      requiredFields.push("email");
    }
    if (!phone) {
      requiredFields.push("phone");
    }

    if (requiredFields.length > 0) {
      const errorMessage = `missing required ${requiredFields.join(
        ", "
      )} field`;
      throw HttpError(400, errorMessage);
    }

    const { error } = addSchema.validate(req.body);
    if (error) {
      console.log(error);
      throw HttpError(400, error.message);
    }
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!req.body) {
      throw HttpError(400, "missing fields");
    }
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const resultContact = await contacts.updateContact(contactId, req.body);
    if (!resultContact) {
      throw HttpError(404, "Not found");
    }
    res.json(resultContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
