const contacts = require("../../models/contacts.json");
const express = require("express");
const Joi = require("joi");
const { HttpEror } = require("../../helpers/index.js");

const contactsService = require("../../models/contacts.js");

const contactsRouter = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required().message({
    "any.required": `add "name" please`,
  }),
  email: Joi.string().email().required(),
  phone: Joi.string().required().message({
    "any.required": `add "phone" please`,
  }),
});

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpEror(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpEror(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpEror(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      message: "Delete successful",
    });
  } catch (error) {
    next(error);
  }
  res.json({ message: "template message" });
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpEror(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpEror(404, `Contact with id=${contactId} not found`);
    }
    req.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = contactsRouter;

contactsRouter.get("/contacts", (req, res) => {
  res.json(contacts);
});

contactsRouter.get("/contacts/:id", (req, res) => {
  res.json(contacts[0]);
});

contactsRouter.post("/contacts", (req, res) => {
  res.json(contacts[0]);
});
