const express = require("express");
const Joi = require("joi");

const { RequestError } = require("../../helpers");
const contacts = require("../../models/contacts");
const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
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
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) throw RequestError(400, error.message);

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// router.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) throw RequestError(400, error.message);
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) throw RequestError(404, "Not Found");
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
