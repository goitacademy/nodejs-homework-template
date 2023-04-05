const express = require("express");
const contacts = require("../../models/contacts");
const {HttpError, ValidateSchema} = require("../../helpers");

const router = express.Router();

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
    const {id} = req.params;
    const result = await contacts.getById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post("/", async (req, res, next) => {
  try {
    const resultValidation = ValidateSchema(req.body);
    const {error} = resultValidation;
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const {error} = ValidateSchema(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const {id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json({
      message: "contact deleted"
    })
  } catch (error) {
    next(error);
  }
})

module.exports = router;
