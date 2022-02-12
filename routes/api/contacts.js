const express = require("express");

const { validateRequestBody } = require("../../middlewares/validete");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  if (!contacts) {
    return res.status(400).json({ message: "contacts not found" });
  }

  res.status(200).json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact.length === 0) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({ contact });
});

router.post("/", validateRequestBody(), async (req, res, next) => {
  const { name, email, phone } = req.body;

  const body = {
    id: new Date().getTime().toString(),
    name,
    email,
    phone,
  };

  await addContact(body);

  res.status(201).json({ ...body });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  res.status(result.status).json({ message: result.message });
});

router.put("/:contactId", validateRequestBody(), async (req, res, next) => {
  const { contactId } = req.params;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const data = await updateContact(contactId, req.body);

  if (data.status === 400) {
    return res.status(data.status).json({ message: data.result });
  }

  res.status(data.status).json(data.result);
});

module.exports = router;
