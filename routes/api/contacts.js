const express = require("express");

const contacts = require("../../models/contacts");

const router = express.Router();

const { requestError } = require("../../helpers");

const joi = require("joi");
const contactObj = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw requestError(404, `Id ${id} not found, try a different id`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactObj.validate(req.body);
    if (error) {
      throw requestError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw requestError(404, `Id ${id} not found, try a different id`);
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactObj.validate(req.body);
    if (error) {
      throw requestError(400, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateContactById(id, req.body);
    if (!result) {
      throw requestError(404, `Id ${id} not found, try a different id`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
