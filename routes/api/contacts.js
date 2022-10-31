const express = require("express");
const api = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contatcs = await api.listContacts();
  res.json({ contatcs });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contactToShow = await api.getContactById(id);
  if (!contactToShow) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json({ contactToShow });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: "missing required field" });
  } else {
    const isAdded = await api.addContact(req.body);
    if (isAdded.error) {
      const message = isAdded.error.message;
      res.status(400).json({ message });
    } else {
      res.status(201).json({ newContact: isAdded.value });
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const success = await api.removeContact(id);
  if (success) {
    res.json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const body = req.body;
  const id = req.params.contactId;
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing fields" });
  } else {
    const result = await api.updateContact(id, body);
    if (result !== null) {
      if (result.message) {
        res.json({ message: result.message });
      } else {
        res.json({ result });
      }
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
});

module.exports = router;
