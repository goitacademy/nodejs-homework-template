const express = require("express");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const HttpError = require("../../helpers/HttpError");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ status: 200, contacts });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const currentContact = await getContactById(contactId);
    if (!currentContact) {
      throw HttpError(404, "Not found");
    }
    res.json({ status: 200, contact: currentContact });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.label;
      res.status(400).json({
        message: `missing required ${missingField} field`,
      });
    }
    const { name, email, phone } = req.body;
    const contact = await addContact(name, email, phone);
    res.status(201).json({ status: 201, contact });
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json({
      status: 200,
      message: "contact deleted",
    });
  } catch (e) {
    next(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    if (!body.name && !body.email && !body.phone) {
      res.status(400).json({
        status: 400,
        message: "missing fields",
      });
      return;
    }
    
    const contact = await updateContact(contactId, body);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json({
      status: 200,
      contact,
    });
  } catch (e) {
    next(e)
  }
});

module.exports = router;
