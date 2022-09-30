const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const contactSchema = require("../../validation/contactShema");

const router = express.Router();

router.get("/", async (_, res) => {
  const contacts = await listContacts();
  res.status(200).json({ status: "success", code: 200, data: { contacts } });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ status: "success", code: 200, data: { result } });
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  const validationData = contactSchema.validate({ name, email, phone });
  if (validationData.error) {
    return res.status(400).json({ status: validationData.error.details });
  }

  const newContact = await addContact(name, email, phone);

  res.status(201).json({ status: "success", code: 201, data: { newContact } });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const validationData = contactSchema.validate(req.body);
  if (validationData.error) {
    return res.status(400).json({ status: validationData.error.details });
  }
  const result = await updateContact(id, req.body);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(201).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
});

module.exports = router;
