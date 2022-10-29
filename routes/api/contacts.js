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

  res
    .status(200)
    .json({ status: "success", message: { contacts: contactsDB } });
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    return res.status(400).json({ message: "Not found" });
  }
  res.status(200).json({ status: "success", message: { contact: data } });
});

router.post("/", addPostValidation, async (req, res) => {
  const body = req.body;
  const data = await addContact(body);
  res.status(201).json({ status: "success", message: { contact: data } });
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;

  const data = await removeContact(contactId);

  if (!data) {
    return res.status(400).json({ message: "Not found" });
  }

  res.status(200).json({ status: "success", message: "contact deleted" });
});

router.put("/:contactId", updatePostValidation, async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const data = await updateContact(contactId, body);

  if (!data) {
    return res.status(400).json({ message: "Not found" });
  }
  res.status(200).json({ status: "success", message: "contact update" });
});

module.exports = router;
