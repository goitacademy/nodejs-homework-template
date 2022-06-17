const express = require("express");

const contactsOperations = require("../../models/contacts.js");
const { NotFound } = require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.number().required(),
});

const router = express.Router();

router.get("/", async (_, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
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
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      message: `Contact with id=${contactId}`,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 200,
      message: "Contact added",
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
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: `Contact  with id=${contactId} deleted`,
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
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: `Contact with id=${contactId} updated`,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
