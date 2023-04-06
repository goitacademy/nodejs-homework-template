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

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const result = await contactsOperations.getContactById(id);

    if (!result) {
      throw createError(404, `contact with id: ${id} not found`);
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

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);

    if (!result) {
      throw createError(404, `contact with id: ${id} not found`);
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

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contuctSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const result = await contactsOperations.updateContact(
      id,
      name,
      email,
      phone
    );

    if (!result) {
      throw createError(404, `contact with id: ${id} not found`);
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
