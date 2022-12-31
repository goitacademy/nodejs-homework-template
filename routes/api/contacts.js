const { json } = require("express");
const express = require("express");
const db = require("/nodejs-homework-rest-api/models/contacts");
const router = express.Router();
const schemas = require("/nodejs-homework-rest-api/schemas/schemas");

router.get("/", async (req, res, next) => {
  const contacts = await db.listContacts();
  res.json({ data: contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await db.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "not found" });
  }
  res.json({ data: contact });
});

router.post("/", async (req, res, next) => {
  try {
    const isValidData = schemas.post.validate(req.body);
    if (isValidData.error) {
      return res.status(400).json({ status: validationResult.error });
    }
    const newContact = req.body;
    newContact.id = Date.now().toString();
    await db.addContact(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await db.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "not found" });
  }
  await db.removeContact(contactId);
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const isValidData = schemas.put.validate(req.body);
    if (isValidData.error) {
      return res.status(400).json({ status: validationResult.error });
    }
    const { contactId } = req.params;
    const findContact = await db.getContactById(contactId);
    if (findContact === null) {
      return res.status(400).json({ msg: `Contact ${contactId} is not found` });
    }
    await db.updateContact(contactId, req.body);
    res.json(req.body);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
