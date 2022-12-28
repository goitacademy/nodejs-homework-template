const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json({ data });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const data = await getContactById(contactId);
    if (data === undefined) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ data });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const data = await addContact(req.body);
  res.status(201).json({ data });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
