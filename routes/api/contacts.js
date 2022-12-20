const express = require("express");
const createError = require("http-errors");
const Joi = require("joi");

const router = express.Router();

const contactOperations = require("../../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(20).trim().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  phone: Joi.string()
    .regex(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contact = await contactOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactOperations.getContactById(contactId);
    if (!contact) {
      throw createError(
        404,
        `Contact with contactId - ${contactId} is not found`
      );
      // const error = new Error(
      //   `Contact with contactId - ${contactId} is not found`
      // );
      // error.status = 404;
      // throw error;
      // res.json({
      //   status: "error",
      //   code: 404,
      //   message: `Contact with contactId=${contactId} is not found`,
      // });
    }
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = contactSchema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const contact = await contactOperations.addContact(body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result: contact },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactOperations.removeContact(contactId);

    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = contactSchema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const contact = await contactOperations.updateContact(contactId, body);
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
