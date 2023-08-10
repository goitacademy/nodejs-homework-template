const express = require("express");
const Joi = require("joi");
const router = express.Router();
const contactsHandler = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const data = await contactsHandler.listContacts();
    res.json(data);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const data = await contactsHandler.getContactById(contactId);

    if (!data) {
      throw HttpError(404, "Not found");

      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;

      // return res.status(404).json({ message: "Not found" });
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
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const data = await contactsHandler.addContact(req.body);
    res.status(201).json(data);
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
    const { contactId } = req.params;
    const data = await contactsHandler.updateContact(contactId, req.body);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const data = await contactsHandler.removeContact(contactId);

    if (!data) {
      throw HttpError(404, "Not found");
    }

    res.json(data);
    // res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
