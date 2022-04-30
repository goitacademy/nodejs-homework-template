const express = require("express");
const {
  addPostValidation,
  patchValidation,
} = require("../../middlewares/validationSchema");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  putContact,
} = require("../../models/contacts");

// router.get("/", listContacts);
router.get("/", async (req, res, next) => {
  const contact = await listContacts();
  res.json(contact);
});

// router.get("/:contactId", getContactById);
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  res.json(contactById);
});

// router.post("/", addPostValidation, addContact);
router.post("/", addPostValidation, async (req, res, next) => {
  const { name, email, phone } = req.body;
  await addContact(name, email, phone);
  res.json({ status: "success" });
});

// router.delete("/:contactId", removeContact);
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.json({ status: "success" });
});

// router.put("/:contactId", addPostValidation, putContact);
router.put("/:contactId",addPostValidation, async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  console.log("contactId", contactId);
  console.log(name, email, phone);
  await putContact(contactId, { name, email, phone });
  res.json({ status: "success" });
});

// router.patch("/:contactId", patchValidation, putContact);
router.patch("/:contactId", patchValidation, async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  console.log("contactId", contactId);
  console.log(name, email, phone);
  await putContact(contactId, { name, email, phone });
  res.json({ status: "success" });
});

module.exports = router;
