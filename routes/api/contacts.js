const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");
const createError = require("http-errors");

const router = express.Router();

const schemaPost = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
}).required();

const schemaPut = Joi.object({
  name: Joi.string().alphanum(),
  email: Joi.string(),
  phone: Joi.number(),
});

router.get("/", async (req, res, next) => {
  try {
    res.json({ data: await listContacts(), status: 200 });
  } catch (err) {
    next(createError(err));
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      res.json({ data: contact, status: 200 });
    } else res.json({ massage: "Not found", status: 404 });
  } catch (err) {
    next(createError(err));
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = schemaPost.validate(req.body);
    if (body.error) {
      return res.json({ massage: body.error.message, status: 400 });
    }
    const newContact = await addContact(body.value);
    console.log(body);
    res.json({ data: newContact, status: 200 });
  } catch (err) {
    next(createError(err));
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const deleteContact = await removeContact(req.params.contactId);
    if (deleteContact) res.json({ message: "contact deleted", status: 200 });
    else res.json({ message: "Not found", status: 404 });
  } catch (err) {
    next(createError(err));
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const validator = schemaPut.validate(req.body);
    console.log(req.body, "req.body");
    if (Object.keys(req.body).length === 0) {
      return res.json({ message: "missing fields", status: 400 });
    } else if (validator.error) {
      return res.json({ message: validator.error.message, status: 400 });
    }

    const data = await updateContact(req.params.contactId, validator.value);
    if (data) res.json({ data: data, status: 200 });
    else res.json({ message: "not found", status: 404 });
  } catch (err) {
    next(createError(err));
  }
});

module.exports = router;
