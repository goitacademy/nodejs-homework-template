const express = require("express");
const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");
const Joi = require("joi");

const contactsChema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
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
    const contactById = await contactsOperations.getContactById(contactId);
    if (!contactById) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contactById,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactsChema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const addContact = await contactsOperations.addContact(body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: addContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contactsOperations.removeContact(contactId);
    if (!removedContact) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: removedContact,
      },
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;
    const { error } = contactsChema.validate(body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const updatedContact = await contactsOperations.updateContact(id, body);
    if (!updatedContact) {
      throw createError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
