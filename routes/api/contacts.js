const express = require("express");
const Joi = require("joi");

const contactSchema = Joi.object({
  // id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

const contactsOperation = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    // res.json({ contacts });
    res.json({ message: "template message", contacts });
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperation.getContactById(id);
    if (!result) {
      const error = new Error(`Contact with id=${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      res.json({ message: "missing required name field" });
      throw error;
    }
    const result = await contactsOperation.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperation.removeContact(id);
    if (!result) {
      const { error } = new Error(`Contact with id=${id} not found`);
      throw error;
    }
  } catch (error) {
    next(error);
  }
  res.json({ message: "contact deleted" });
});

router.put("/:id", async (req, res, next) => {
  try {
    // const { error } = contactSchema.validate(req.body);
    // if (error) {
    //   error.status = 400;
    //   throw error;
    // }
    const { id } = req.params;

    const result = await contactsOperation.updateContact(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
