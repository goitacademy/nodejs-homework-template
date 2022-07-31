const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ contact });
});

router.post("/", addContactValidation, async (req, res, next) => {
  const contact = await addContact(req.body);

  return res.status(201).json({ contact });
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", updateContactValidation, async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.body);

  return res.status(200).json({ contact });
});

module.exports = router;
