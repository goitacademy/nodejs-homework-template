const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contactsList = await listContacts();
  res.json({ status: "success", code: 200, data: contactsList });
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);
  res.json({ status: "success", code: 200, data: contact });
});

router.post("/", async (req, res, next) => {
  await addContact(req.body);
  res.json({ status: "success", code: 201, data: "Contact added" });
});

router.delete("/:contactId", async (req, res, next) => {
  await removeContact(req.params.contactId);
  res.json({
    message: `Contact with ID ${req.params.contactId} was succesfully removed`,
  });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message put" });
});

module.exports = router;
