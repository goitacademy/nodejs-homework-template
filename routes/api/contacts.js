const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactsList = await listContacts();
  res.json(contactsList);
});

router.get("/:contactId", async (req, res, next) => {
  const { params } = req;
  const contactByItem = await getContactById(params.contactId);
  res.json(contactByItem);
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  const { params } = req;
  const contactsWithoutItem = await removeContact(params.contactId);
  console.log("contactsWithoutItem", contactsWithoutItem);
  if (contactsWithoutItem) {
    res.json({ message: "contact deleted" });
  } else {
    res.json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
