const express = require("express");
const router = express.Router();

const functions = require("../../controller/contactController");
const { schema } = require("../../validation/validation.js");

router.get("/", async (req, res) => {
  const contacts = await functions.listContacts();
  res.send(contacts);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await functions.getContactById(id);
  if (!contact) {
    return res.status(400).json({ message: "Not found" });
  }
  res.send(contact);
});

router.post("/", async (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details[0].message,
    });
  }
  const contact = await functions.addContact(req.body);
  res.status(201).send(contact);
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await functions.removeContact(id);
  if (!result) {
    return res.status(400).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details[0].message,
    });
  }
  const contact = await functions.updateContact(id, req.body);
  if (!contact) {
    return res.status(400).json({ message: "Not found" });
  }
  res.status(200).send(contact);
});

module.exports = router;
