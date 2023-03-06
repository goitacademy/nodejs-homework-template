const express = require("express");
const Joi = require("joi");

const contactsJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .required(),
});

const router = express.Router();
const contactsOperation = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsOperation.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.getContactById(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsJoiSchema.validate(req.body);
    if (error) {
      error.message = "missing required name field";
      error.status = 400;
      throw error;
    }
    const result = await contactsOperation.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperation.removeContact(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!req.body) {
      const error = new Error(`missing fields`);
      error.status = 400;
      throw error;
    }
    const { error } = contactsJoiSchema.validate(req.body);
    if (error) {
      error.message = "missing required name field";
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await contactsOperation.updateContact(contactId, req.body);
    if (!result) {
      const error = new Error(`Not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
