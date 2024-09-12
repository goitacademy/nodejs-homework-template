const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContacts,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const delContact = await removeContact(req.params.contactId);
    if (delContact) res.json({ message: "Contact delete" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const contacts = await updateContacts(req.params.contactId, req.body);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
