const express = require("express");
const contacts = require("../../models/contacts");
const Joi = require("joi");
const { errorMessage, catchAsync } = require("../../helpers");

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  })
);

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const result = await contacts.getContactById(contactId);
    if (!result) throw errorMessage({ status: 404 });
    return res.json(result);
  })
);

router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw errorMessage({
        status: 400,
        message: "missing required name field",
      });
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  })
);

router.delete(
  "/:contactId",
  catchAsync(async (req, res, next) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) throw errorMessage({ status: 404 });
    res.json({ message: "contact deleted" });
  })
);

router.put(
  "/:contactId",
  catchAsync(async (req, res, next) => {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw errorMessage({ status: 400, message: "missing fields" });
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) throw errorMessage({ status: 404 });
    res.json(result);
  })
);

module.exports = router;
