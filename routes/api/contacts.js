const express = require("express");
const { NotFound, BadRequest } = require("http-errors");
const Joi = require("joi");

const router = express.Router();

const contactsOperations = require("../../models");

const joiSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await contactsOperations.getContactById(
      req.params.contactId
    );
    if (!contact) {
      throw new NotFound();
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { contactId } = req.params;
    console.log(contactId);
    const updateContact = await contactsOperations.updateById(
      contactId,
      req.body
    );
    if (!updateContact) {
      throw new NotFound();
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteCotatact = await contactsOperations.removeContact(contactId);
    if (!deleteCotatact) {
      throw new NotFound();
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
