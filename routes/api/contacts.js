const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { NotFound } = require("http-errors");
const contactsOperations = require("../../model/index");

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const products = await contactsOperations.listContacts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
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
      throw new Error();
    }
    const newCcontact = await contactsOperations.addContact(req.body);
    res.status(201).json(newCcontact);
  } catch (error) {
    res.status(400).json({ message: "missing required name field" });
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
      return res.status(400).json({ message: "missing fields" });
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
