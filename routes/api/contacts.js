const express = require("express");

const router = express.Router();

const path = require("path");

const { addContactSchema, updateContactSchema } = require(path.join(
  __dirname,
  "../../schemas/contacts.js"
));

const Contacts = require(path.join(__dirname, "../../models/contacts.js"));

router.get("/", async (req, res, next) => {
  const result = await Contacts.listContacts();
  res.status(200).json(result);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await Contacts.getContactById(id);

  if (result === null) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json(result);
});

router.post("/", async (req, res, next) => {
  const response = addContactSchema.validate(req.body, { abortEarly: false });

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing required name field" });
  }

  const result = await Contacts.addContact(req.body);

  return res.status(201).json(result);
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await Contacts.removeContact(id);

  if (result === null) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json({ message: "Contact deleted" });
});

router.put("/:id", async (req, res, next) => {
  const response = updateContactSchema.validate(req.body, {
    abortEarly: false,
  });
  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing required name field" });
  }

  const { id } = req.params;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const result = await Contacts.updateContact(id, req.body);

  if (result === null) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json(result);
});

module.exports = router;
