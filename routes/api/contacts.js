const express = require("express");
const {
  updateContact,
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("../../models/contacts.js");
const {
  addPostValidation,
} = require("../../models/middlewares/ValidationMiddleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await listContacts();

  res.json({ data, message: "success" });
});

router.get("/:contactId", async (req, res, next) => {
  const data = await getContactById(req.params.contactId);

  res.json({ data, message: "success" });
});

router.post("/", addPostValidation, async (req, res, next) => {
  const data = await addContact(req.body);
  res.json({ data, message: "success" });
});

router.delete("/:contactId", async (req, res, next) => {
  const data = await removeContact(req.params.contactId);

  res.json({ data, message: "success" });
});

router.put("/:contactId", addPostValidation, async (req, res, next) => {
  const data = await updateContact(req.params.contactId, req.body);

  res.json({ data, message: "success" });
});

module.exports = router;
