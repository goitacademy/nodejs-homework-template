const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    res.json(data);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const data = await contacts.getContactById(contactId);
    if (!data) {
      throw new HttpError(404, "Contact not found");
      //1. const error = new Error("Contact not found");
      // error.status = 404;
      // throw error;

      //2. return res.status(404).json({ message: "Contact not found" });
    }
    res.json(data);
  } catch (error) {
    next(error);
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({ message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }

    const data = await contacts.addContact(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contacts.removeContact(contactId);
    if (!data) {
      throw new HttpError(404, "Contact not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const data = await contacts.updateContact(contactId, req.body);

    if (!data) {
      throw new HttpError(404, "Contact not found");
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
