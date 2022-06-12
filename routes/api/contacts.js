const express = require("express");
const CreateError = require("http-errors");
const Joi = require("joi");

const router = express.Router();
const contactsOperations = require("../../models/contacts");

const addContactSchema = Joi.object({
  name: Joi.string().alphanum().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.number().required(),
});
const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().trim(),
  email: Joi.string().email().trim(),
  phone: Joi.number(),
});

router.get("/", async (_, res, next) => {
  try {
    const data = await contactsOperations.listContacts();
    res.json({ message: "contact list", statusOperation: "success", data });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      throw new CreateError(404, "Contact not found", {
        statusOperation: false,
      });
    }
    res.json({ message: "contact", statusOperation: "success", data: contact });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message, { statusOperation: false });
    }
    const data = await contactsOperations.addContact(req.body, null, 2);
    res.status(201).json({
      message: "contact successfully added",
      statusOperation: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contactsOperations.removeContact(contactId);
    if (!data)
      throw CreateError(404, "Can't delete. Contact not found ", {
        statusOperation: false,
      });
    res.json({
      message: "contact successfully deleted",
      statusOperation: "success",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }
    const { contactId } = req.params;
    const newContactDate = req.body;
    const data = await contactsOperations.updateContact(
      contactId,
      newContactDate
    );
    if (!data)
      throw CreateError(404, "Can't update. Contact not found ", {
        statusOperation: false,
      });
    res.json({
      message: "contact successfully edit",
      statusOperation: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
