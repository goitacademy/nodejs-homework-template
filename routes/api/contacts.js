const express = require("express");

const Joi = require("joi");
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactsOperations = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();

    res.json({
      tstaus: "Success",
      code: 200,
      message: "Contacts received",
      data: { contacts },
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
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      ststaus: "Success",
      code: 200,
      message: "Contact found",
      data: { contact },
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

    const contact = await contactsOperations.addContact(req.body);

    res.status(201).json({
      ststaus: "Success",
      code: 201,
      message: "Contact was added",
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.removeContact(contactId);

    if (!contact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      ststaus: "Success",
      code: 200,
      message: "Contact deleted",
      data: {
        contact,
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

    const contact = await contactsOperations.updateContact(contactId, req.body);

    if (!contact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
