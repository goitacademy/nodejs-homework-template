const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");
const { HttpError } = require("../../utils");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
    .required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    // res.status(500).json({ message: "Server error" });
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    console.log(result);
    if (!result) {
      throw HttpError(404, "NotFound");
      //   const error = new Error("Not found");
      //   error.status = 404;
      //   throw error;
    }
    res.json(result);
  } catch (error) {
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({ message });
    // res.status(500).json({ message: "Server error" });
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContactById(contactId);
    console.log(result);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json({ message: "Delete success" });
    // res.status(204).send()
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(res.body);
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (error) {
      throw HttpError(404, "Not found");
    }

    if (!result) {
      throw HttpError(404, "NotFound");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    res.json({ message: "template message" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
