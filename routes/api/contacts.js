const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.status(200).json(await listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  if ((await getContactById(req.params.id)) === null) {
    res.status(404).json({ message: "Not Found" });
  }
  res.status(200).json(await getContactById(req.params.contactId));
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  if ((await getContactById(req.params.id)) === null) {
    res.status(404).json({ message: "Not Found" });
  }
  await removeContact(req.params.contactId);
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
