const express = require("express");
const contactsApi = require("../../models/contacts");
const errorHandler = require("../../heplers/errorHandler");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsApi.listContacts();
    if (!result) {
      throw errorHandler(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contactsApi.getContactById(id);
    if (!result) {
      throw errorHandler(404);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    await contactsApi.addContact(body);
    res.json("Contact added :", body);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
