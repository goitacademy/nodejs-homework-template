const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  validateAddContact,
  validateUpdateContact,
} = require("../../middlewares/validation");

router.get("/", async (req, res, next) => {
  return res.status(200).json(await listContacts());
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
});

router.post("/", validateAddContact, async (req, res, next) => {
  const result = await addContact(req.body);

  res.status(201).json(result);
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:id", validateUpdateContact, async (req, res, next) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body, res);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
});

module.exports = router;
