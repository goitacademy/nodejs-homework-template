const express = require("express");
const contacts = require("../../models/contacts.js");
const router = express.Router();
const Schema = require("../../helper/validControl.js");
const joi = require("joi");

const HttpError = require("../../helper/HttpError.js");

router.get("/", async (req, res) => {
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
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = Schema.validate(req.body);
    if (error) {
      throw HttpError(404, message.error);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// CHANG POST (PUT)

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = Schema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateById(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.remove(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: "Delete contact" });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
