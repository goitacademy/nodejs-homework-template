const express = require("express");
const { NotFound } = require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

const router = express.Router();

const contactsOperations = require("../../models/contacts");

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
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      throw NotFound(`Contacts with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: result,
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
      throw error;
    }
    const newContacts = await contactsOperations.addContact(req.body);

    res.status(201).json({
      status: "Seccess",
      code: 201,
      data: {
        result: newContacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactRemove = await contactsOperations.removeContact(contactId);
    if (!contactRemove) {
      throw NotFound(`Contacts with id=${contactId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      message: "contact delete",
      data: {
        result: contactRemove,
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
    const updeteIdx = await contactsOperations.updateContact(
      contactId,
      req.body
    );
    if (!updeteIdx) {
      throw NotFound(`Contacts with id=${contactId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result: updeteIdx,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
