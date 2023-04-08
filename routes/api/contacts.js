const express = require("express");
const { NotFound } = require("http-errors");
const router = express.Router();
const Joi = require("joi");
const contactsOperations = require("../../models/contacts");

const contactsSchema = Joi.object({
  name: Joi.string().required,
  email: Joi.number().required,
  phone: Joi.string().required,
});

router.get("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw Error;
    }
    const contacts = await contactsOperations.listContacts();
    if (!contacts) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsOperations.getContactById(id);
    if (!contact) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await contactsOperations.add(req.body);
    res.status(201).json({
      status: "succes",
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
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "succes",
      code: 200,
      message: "contact deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const result = await contactsSchema.updateContact(id, req.body);
    if (!result) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "succes",
      code: 200,
      data: {
        result,
      },
    });
  } catch {}
});

module.exports = router;
