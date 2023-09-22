const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();
router.get("/", async (req, res, next) => {
  const db = listContacts()
    .then((data) => res.json({ data: JSON.parse(data) }))
    .catch((err) => console.log(err));
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const response = await getContactById(contactId);
  res.status(200).json({
    data: response,
  });
});

router.post("/", async (req, res, next) => {
  const { name, phone, email } = req.body;
  const newContact = await addContact({ name, phone, email });
  res.status(201).json({
    data: newContact,
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.status(204).json();
});

router.put("/:contactId", async (req, res, next) => {
  const { name, phone, email } = req.body;
  const { contactId } = req.params;
  await updateContact(contactId, { name, phone, email });
});

module.exports = router;
