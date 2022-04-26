const express = require("express");

const router = express.Router();

const Joi = require("joi");

const contastsShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactsOperations = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({ status: "success", code: 200, data: { result: contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contsct = await contactsOperations.getContactById(contactId);
    if (!contsct) {
      const error = new Error(`Not found ${contactId}`);
      error.status = 404;
      throw error;
    }
    res.json({ status: "success", code: 200, data: { result: contsct } });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contastsShema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }
    const contacts = await contactsOperations.addContact(req.body);
    res
      .status(201)
      .json({ status: "success", code: 201, data: { result: contacts } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contsct = await contactsOperations.removeContact(contactId);
    if (!contsct) {
      const error = new Error(`Not found ${contactId}`);
      error.status = 404;
      throw error;
    }
    res.json({ status: "success", code: 200, data: { result: contsct } });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contastsShema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }
    const { contactId } = req.params;
    const contacts = await contactsOperations.updateContact(
      contactId,
      req.body
    );
    res
      .status(200)
      .json({ status: "success", code: 200, data: { result: contacts } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
