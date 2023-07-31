const Joi = require("joi");

const express = require('express')

const contacts = require("../../models/contacts");

const router = express.Router()

const contactsSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error;
    }
       res.status(200).json({ message: "contact deleted", data: result });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing fields";
      throw error;
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: "contact updated", data: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router
