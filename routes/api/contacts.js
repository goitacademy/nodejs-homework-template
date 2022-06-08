const express = require("express");

const Joi = require("joi");

const contacts = require("../../models");

const router = express.Router();

const joiScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}).min(1);

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await contacts.getContactById(contactId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiScheme.validate(req.body);

    if (error) {
      // error;
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contacts.removeContact(contactId);
  if (!result) {
    // throw error
    res.json({ message: "Not deleted" });
  }

  res.json({ message: "Contact deleted" });

  try {
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = joiScheme.validate(req.body);

    if (error) {
      //
    }

    const { contactId } = req.params;

    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      // return res.json("nothing change");
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
