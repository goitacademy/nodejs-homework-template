const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    return res.status(200).json(allContacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contacts = await getContactById(contactId);
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", async (req, res, next) => {
  //TO DO -> add validation (name, email, phone as required in body request)
  const body = req.body;
  try {
    const contacts = await addContact(body);
    return res.status(201).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
