const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const router = express.Router();

const { HttpError } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).required(),
  phone: Joi.string().pattern(/^[0-9]+$/, "numbers").required(),
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (err) {
    next(err);
    // res.status(500).json({
    //   message: "Server error",
    // });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      throw HttpError(404, "Not found");
      // const err = new Error("Not found");
      // err.status = 404;
      // throw err;
      // return res.status(404).json({
      //   message: "Not found",
      // });
    }
    res.json(contact);
  } catch (err) {
    next(err);
    // const { status = 500, message = "Server error"} = err;
    // res.status(status).json({
    //   message,
    // });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { err } = addSchema.validate(req.body);
    if (err) {
      throw HttpError(400, err.message);
    }
    const { name, email, phone } = req.body;
    const newContact = await contacts.addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const removeContact = await contacts.removeContact(contactId);
  res.json(removeContact);
});

router.put("/:contactId", async (req, res, next) => {
    try {
    const { err } = addSchema.validate(req.body);
    if (err) {
      throw HttpError(400, err.message);
    }
  const { contactId } = req.params;
  const updateContactId = await contacts.updateContact(contactId, req.body);
      res.json(updateContactId);
        } catch (err) {
    next(err);
  }
});

module.exports = router;
