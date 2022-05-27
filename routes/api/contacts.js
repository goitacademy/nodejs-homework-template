const express = require("express");
const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");
const Joi = require("joi");

const router = express.Router();
const schema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.number().integer().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts();
    res
      .status(200)
      .json({ status: "success", code: 200, data: { result: result } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(200).json({
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

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      code: "200",
      message: "contact deleted",
      removedContact: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, `Contact with id="${contactId}" not found`);
    }
    res.status(200).json({
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
