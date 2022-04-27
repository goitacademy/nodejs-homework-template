const express = require("express");
const contacts = require("../../models/contacts.js");
const { createError } = require("../../helpers/index");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    if (!result) {
      throw createError();
    }
    res.json({ status: 200, message: "success", data: result });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({ status: 200, message: "success", data: result });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body);
    res.json({ status: 201, message: "success", data: result });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({ status: 200, message: "contact deleted", data: result });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "PUT template message" });
});

module.exports = router;
