const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  // .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
  // (\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    console.log("result", result);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneContact = await contacts.getContactById(id);
    if (!oneContact) {
      throw HttpError(404, "Not found");
    }
    // console.log(`Contact with ${id} found !`, oneContact);
    console.log("oneContact", oneContact);
    res.json(oneContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    console.log("error", error);
    if (error) {
      throw HttpError(404, error.message);
    }
    const contactNew = await contacts.addContact(req.body);
    console.log("Contact added successfully!");
    res.status(201).json(contactNew);
    // res.json(contactNew)
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  const removeContactId = await contacts.removeContact(id);
  if (!removeContactId) {
    throw HttpError(404, "Not found");
  }
  // console.log("Contact successfully deleted!", removeContactId);

  // res.status(204).send()
  res.json({
    message: "Delete success",
  });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    console.log("error", error);
    if (error) {
      throw HttpError(404, error.message);
    }

    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
