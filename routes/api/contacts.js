const express = require("express");
const Joi = require("joi");

const router = express.Router();

const contacts = require("../../models/contacts");

const { HttpError, ctrlWrapper } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string().required(),

  phone: Joi.string().required(),
});

router.get(
  "/",
  ctrlWrapper(async (req, res, next) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  })
);

router.get(
  "/:contactId",
  ctrlWrapper(async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  })
);

router.post(
  "/",
  ctrlWrapper(async (req, res, next) => {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, "missing required name field");
    }

    const result = await contacts.addContact(req.body);

    res.status(201).json(result);
  })
);

router.delete(
  "/:contactId",
  ctrlWrapper(async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200, "contact deleted").json(result);
  })
);

router.put(
  "/:contactId",
  ctrlWrapper(async (req, res, next) => {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, "missing fields");
    }

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  })
);

module.exports = router;
