const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const { addContactSchema, editContactSchema } = require("./joi");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json(await listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);

  if (!contact) {
    return res.status(404).json({ message: "contact is not found" });
  }

  res.json(contact);
});

router.post("/", async (req, res, next) => {
  const validContact = await addContactSchema.validate(req.body);
  if (validContact.error) {
    return res.status(400).json({ message: "Missing required name field" });
  }
  res.json(await addContact(req.body));
});

router.delete("/:contactId", async (req, res, next) => {
  const isDeleted = removeContact(req.params.contactId);

  if (isDeleted) {
    res.status(404).json(isDeleted);
  }
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const validContact = await editContactSchema.validate(req.body);

  if (validContact.error) {
    return res.status(400).json({ message: "invalid value" });
  }

  res.json(await updateContact(req.params.contactId, req.body));
});

module.exports = router;
