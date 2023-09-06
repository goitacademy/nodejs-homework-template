const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const { HttpError } = require("../../helpers");
const { nanoid } = require("nanoid");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ status: 200, contacts });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const currentContact = await getContactById(contactId);
    if (!currentContact) {
      throw HttpError(404, "Not found");
    }
    res.json({ status: 200, contact: currentContact });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const contact = await addContact(name, email, phone);
    res.status(201).json({ status: 201, contact });
  } catch (e) {
    next(e)
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
