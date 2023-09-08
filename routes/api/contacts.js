const express = require("express");
const Joi = require("joi");
const contactFunction = require("../../models/contacts");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const result = await contactFunction.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactFunction.getContactById(contactId);
    if (result === null) {
      throw new Error();
    }
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw new Error();
    }
    const result = await contactFunction.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: "missing required name field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactFunction.removeContact(contactId);
    if (result === null) {
      throw new Error();
    }
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw new Error();
    }
    const { contactId } = req.params;
    const result = await contactFunction.updateContact(contactId, req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: "missing fields" });
  }
});

module.exports = router;
