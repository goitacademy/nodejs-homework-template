const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { NotFound, BadRequest } = require("http-errors");
const contactsOperations = require("../../model/index");

router.get("/", async (req, res, next) => {
  try {
    const products = await contactsOperations.listContacts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await contactsOperations.getContactById(contactId);
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
    const newCcontact = await contactsOperations.addContact(req.body);
    res.status(201).json(newCcontact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const removeContact = await contactsOperations.removeContact(
      req.params.contactId,
    );
    if (!removeContact) {
      throw new NotFound();
    }
    res.status(200).json({ message: "contact deleted" });
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

    const updateContact = await contactsOperations.updateContact(
      contactId,
      req.body,
    );
    if (!updateContact) {
      throw new NotFound();
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
