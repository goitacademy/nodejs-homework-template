const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  // addContact,
  // updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactsList = await listContacts();
  res.json(contactsList);
});

router.get("/:contactId", async (req, res, next) => {
  const foundContact = await getContactById(req.params.contactId);
  if (foundContact === undefined) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(foundContact);
  }
});

router.post("/", async (req, res, next) => {
  // addContact();
  console.log(req.body);
  // res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  const foundContact = await getContactById(req.params.contactId);
  if (foundContact === undefined) {
    res.status(404).json({ message: "Not found" });
  } else {
    await removeContact(req.params.contactId);
    res.json({ message: "contact deleted" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
