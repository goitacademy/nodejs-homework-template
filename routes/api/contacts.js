const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const validationBody = require("../../middleware/validationBody.js");
const {
  schemaPostContact,
  schemaPutContact,
} = require("../../schema/schema.js");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ data: contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact === null) {
    return next();
  }
  res.status(200).json({ data: contact });
});

router.post("/", validationBody(schemaPostContact), async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);
  res.status(201).json({ data: newContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);
  if (deletedContact === null) {
    return next();
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put(
  "/:contactId",
  validationBody(schemaPutContact),
  async (req, res, next) => {
    const { name, email, phone } = req.body;
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, { name, email, phone });
    res.status(200).json({ data: updatedContact });
  }
);

module.exports = router;
