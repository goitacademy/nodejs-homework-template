const express = require("express");
const contactsOperations = require("../../models");
const Joi = require("joi");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().required(),
  email: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = await req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      res.status(404).json({
        message: "Not found",
      });
    }
    res.json({
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
      res.status(400).json({
        message: "missing required name field",
      });
    }
    const newContact = await contactsOperations.addContact({ ...req.body });
    res.status(201).json({
      data: {
        newContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactsOperations.removeContact(contactId);
    if (!deletedContact) {
      res.status(404).json({
        message: "Not found",
      });
    }
    await res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = await contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        message: "missing fields",
      });
    }
    const { contactId } = await req.params;
    const updatedContact = await contactsOperations.updateContact(
      contactId,
      req.body
    );
    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
    }
    res.json({
      data: {
        updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
