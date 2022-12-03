const express = require("express");

const contactOperations = require("../../models/contacts");
const contactsSchema = require("../../schemas/contactsSchema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const respond = await contactOperations.listContacts();
  res.json(respond);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const respond = await contactOperations.getContactById(
      req.params.contactId
    );
    if (respond === null) {
      next();
    } else res.json(respond);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const respond = await contactOperations.addContact(req.body);
    if (respond === null) next();
    else res.status(201).json(respond);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const respond = await contactOperations.removeContact(req.params.contactId);
    if (respond === []) {
      next();
    } else res.json(respond);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const respond = await contactOperations.updateContact(
      req.params.contactId,
      req.body
    );
    if (respond === null) next();
    else res.json(respond);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
