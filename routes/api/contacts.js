const express = require("express");

const contactsService = require("../../models/contacts");

const router = express.Router();

const { HttpError } = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    const results = await contactsService.listContacts();
    res.json(results);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contactsService.getContactById(req.params.contactId);
    console.log(`results222`, result);
    if (!result) {
      throw HttpError(404, `Movie with ${req.params.contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const results = await contactsService.addContact(req.body);
    res.status(201).json(results);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
