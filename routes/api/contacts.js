const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts/contacts");

const { auth } = require("../../middlewares/auth");
const router = express.Router();

router.get("/", auth, listContacts);

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);
  if (contact === null) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ contact });
});

router.post("/", auth, addContact);

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const contacts = await removeContact(contactId);
  if (contacts === null) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(201).json({ message: "contact deleted", contacts });
});

router.put("/:contactId", async (req, res, next) => {
  const upContact = await updateContact(req.params.contactId, req.body);
  if (upContact === null) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ status: "success", upContact });
});

router.patch("/:contactId", async (req, res, next) => {
  const upContact = await updateStatusContact(req.params.contactId, req.body);
  if (upContact === null) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ status: "success", upContact });
});

module.exports = router;
