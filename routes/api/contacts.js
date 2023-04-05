const express = require("express");
const createError = require("http-errors");
const Joi = require("Joi");

const contuctSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactsOperations = require("../../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(req.params);
    const result = await contactsOperations.getContactById(contactId);

    if (!result) {
      throw createError(404, `contact with id: ${contactId} not found`);
    }

    res.json({
      status: "succes",
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
    const { error } = contuctSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { name, email, phone } = req.body;

    const result = await contactsOperations.addContact(name, email, phone);
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
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);

    if (!result) {
      throw createError(404, `contact with id: ${contactId} not found`);
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
    const { error } = contuctSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const result = await contactsOperations.updateContact(
      contactId,
      name,
      email,
      phone
    );

    if (!result) {
      throw createError(404, `contact with id: ${contactId} not found`);
    }

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

module.exports = router;
