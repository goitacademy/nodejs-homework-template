const express = require("express");
const {
  getContactById,
  listContacts,
  removeContact,
  addContact,
  updateContact,
} = require("./../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ message: contacts });
});

router.get("/:contactId", async (req, res, next) => {
  console.log("req", req.params.contactId);
  const contact = await getContactById(req.params.contactId);
  res.json({ message: contact });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!(name && email && phone))
    return res.status(400).json({ message: "Required field is missing" });

  res.json({ message: await addContact(req.body) }).status(201);
});

router.delete("/:contactId", async (req, res, next) => {
  const status = await removeContact(req.params.contactId);
  res
    .status(status === "Contact deleted" ? 200 : 404)
    .json({ message: status });
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!(name || email || phone))
    return res.status(400).json({ message: "Field cannot be empty" });
  const contact = await updateContact(req.params.contactId, req.body);
  res.status(contact === "Not found" ? 404 : 200).json({ message: contact });
});

module.exports = router;
