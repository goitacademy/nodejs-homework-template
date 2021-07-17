const express = require("express");
const router = new express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../model/index.js");
const {
  addContactValidation,
  patchContactsValidation,
  patchStatusContactValidation,
} = require("../../midlewares/validationMidlware");

router.get("/", async (req, res, next) => {
  let cont = await listContacts();
  res.status(200).json({ contacts: cont });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  let findContact = await getContactById(contactId);
  if (!findContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ findContact });
});

router.post("/", addContactValidation, async (req, res, next) => {
  let body = req.body;
  const { name, email, phone, favorite } = body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }
  let newContact = await addContact(body);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  let deleteStatus = await removeContact(contactId);
  if (!deleteStatus) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", addContactValidation, async (req, res, next) => {
  let body = req.body;
  let newContact;
  const { contactId } = req.params;
  if (!body) {
    res.status(400).json({ message: "missing fields" });
  }
  newContact = await updateContact(contactId, body);
  if (!newContact) {
    res.status(404).json({ message: "Not found" });
  }
  res.json({ newContact });
});

router.patch("/:contactId", patchContactsValidation, async (req, res, next) => {
  let body = req.body;
  let newContact;
  const { contactId } = req.params;
  if (!body) {
    res.status(400).json({ message: "missing fields" });
  }
  newContact = await updateContact(contactId, body);
  if (!newContact) {
    res.status(404).json({ message: "Not found" });
  }
  res.json({ newContact });
});

router.patch(
  "/:contactId/favorite",
  patchStatusContactValidation,
  async (req, res, next) => {
    let body = req.body;
    const { contactId } = req.params;
    if (!body) {
      res.status(400).json({ message: "missing field favorite" });
    }
    let newContact = await updateStatusContact(contactId, body).catch((err) => {
      return res.status(404).json({ message: "Not found" });
    });
    res.status(200).json({ newContact });
  }
);

module.exports = router;
