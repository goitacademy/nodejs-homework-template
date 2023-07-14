const express = require("express");
const Joi = require('joi');
const router = express.Router();

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string()
        .min(3)
        .max(30)
        .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.number().required(),
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

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getById(id);
    if (!result) {
      throw HttpError(404, "Not found");
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

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    }); 
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "Contact deleted",
    });
  }
  catch(error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message,
    }); 
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
      if (error) {
      throw HttpError(400, error.message);
      }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
     if (!result) {
      throw HttpError(404, "Not found");
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
