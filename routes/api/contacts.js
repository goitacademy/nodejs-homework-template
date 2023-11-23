const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

const { HttpError, addSchema, putSchema } = require("../../helpers");

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET BY ID
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

// CREATE
router.post("/", async (req, res, next) => {

  try {
    const { error } = addSchema.validate(req.body);
    
    if (error) {
      throw HttpError(400, error.message);
    }
    
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);

  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json("Delete success");
  } catch (error) {
    next(error)
  }
});

// UPDATE
router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = putSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
});

module.exports = router;
