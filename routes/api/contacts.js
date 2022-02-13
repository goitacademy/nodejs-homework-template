const express = require("express");
const Joi = require("joi");

const router = express.Router();

const contactsActions = require("../../models/contacts");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsActions.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    // console.log(req.params);

    const { contactId } = req.params;

    const result = await contactsActions.getContactById(contactId);

    if (!result) {
      const error = new Error({ message: "Not found" });
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
    // console.log(req.body);

    const result = await contactsActions.addContact(req.body);

    if (!result) {
      const error = new Error({ message: "missing required name field" });
      error.status = 400;
      throw error;
    }

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsActions.removeContact(contactId);

    if (!result) {
      const error = new Error({ message: "Not found" });
      error.status = 404;
      throw error;
    }

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // const body = req.body;
    const result = contactsActions.updateContact(contactId, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
  res.json({ message: "template message" });
});

module.exports = router;
