const express = require("express");
const contacts = require("../../models/contacts");
const requestError = require("../../helpers/requestError");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const resolve = await contacts.listContacts();
    return res.status(200).json(resolve);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resolve = await contacts.getContactById(contactId);

    if (!resolve) {
      throw requestError(400);
    }
    return res.status(200).json(resolve);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const resolve = await contacts.addContact(name, email, phone);
    if (!resolve) {
      throw requestError(400);
    }
    return res.status(201).json(resolve);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resolve = await contacts.removeContact(contactId);
    if (!resolve) {
      throw requestError(400);
    }
    return res.status(204).json(resolve);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const resolve = await contacts.updateContact(id, name, email, phone);
    if (!resolve) {
      throw requestError(404);
    }
    res.status(200).json(resolve);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
