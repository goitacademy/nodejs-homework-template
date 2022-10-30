const express = require("express");

const {
  addPostValidation,
  updatePostValidation,
} = require("../../middleware/validation");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res) => {
  const contactsDB = await listContacts();

  res.status(200).json(contactsDB);
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contactsDB = await getContactById(contactId);
  if (!contactsDB) {
    return res.status(400).json({ message: "Not found" });
  }
  res.status(200).json(contactsDB);
});

router.post("/", addPostValidation, async (req, res) => {
  const body = req.body;
  const contactsDB = await addContact(body);
  res.status(200).json(contactsDB);
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;

  const data = await removeContact(contactId);

  if (!data) {
    return res.status(400).json({ message: "Not found" });
  }

  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", updatePostValidation, async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const data = await updateContact(contactId, body);

  if (!data) {
    return res.status(400).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact update" });
});

module.exports = router;
