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
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res) => {
  const contact = await listContacts();
  res.json(contact);
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  }
  res.status(200).json(contactById);
});

router.post("/", addPostValidation, async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);
  res.status(201).json({ status: "success", newContact });
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  } else {
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  }
});

router.put("/:contactId", addPostValidation, async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  } else {
    const updateContactItem = await updateContact(contactId, {
      name,
      email,
      phone,
    });
    res.status(200).json({ status: "success", updateContactItem });
  }
});

router.patch("/:contactId", patchValidation, async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    return res.status(404).json({ status: "Not found" });
  } else {
    const updateContactItem = await updateContact(contactId, {
      name,
      email,
      phone,
    });
    res.status(200).json({ status: "success", updateContactItem });
  }
});

module.exports = router;
