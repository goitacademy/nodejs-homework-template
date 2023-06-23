const express = require("express");

const contacts = require("../../models/contacts");
const Joi = require("joi")

const router = express.Router();

const joiValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  }

  catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      const error = new Error('Not found');
      error.status = 404;
      throw error;
    }

    res.json(result);
  }

  catch (error) {

    const { status = 500, message = "Server error" } = error;

    res.status(status).json({
      message,
    })
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiValidation.validate(req.body);

    if (error) {
      const error = new Error("missing required name field" );
      error.status = 400;
      throw error
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);

  } catch (error) {

    const { status = 500, message = "Server error" } = error;

    res.status(status).json({
      message,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId)

    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.json({ message: "contact deleted" });
  }
  catch (error) {
    const { status = 500, message = 'Server error' } = error;

    res.status(status).json({
      message,
    })
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = joiValidation.validate(req.body);

    if (error) {
      const error = new Error("missing required name field");
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    
    res.json(result);

  }
  
  catch (error) {
    const { status = 500, message = "Server error" } = error;

    res.status(status).json({
      message,
    });
  }
});

module.exports = router;
