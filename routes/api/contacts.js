const express = require("express");
const pls = require("../../models/contacts");
const router = express.Router();

// @ GET /api/contacts
router.get("/", async (req, res, next) => {
  const response = await pls.listContacts();
  res.json(response);
});

// @ GET /api/contacts/:id
router.get("/:contactId", async (req, res, next) => {
  const response = await pls.getContactById(req.params.contactId);
  if (response === undefined) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(response);
  }
});

// @ DELETE /api/contacts/:id
router.delete("/:contactId", async (req, res, next) => {
  const response = await pls.removeContact(req.params.contactId);
  if (response.message === "Not found") {
    res.status(404).json(response);
  } else {
    res.status(200).json(response);
  }
});

// @ POST /api/contacts
router.post("/", async (req, res, next) => {
  const response = await pls.addContact(req.body);
  if (response.message === "Your request is not in proper format.") {
    res.status(400).json(response);
  } else {
    res.status(201).json(response);
  }
});

// @ PUT /api/contacts/:id
router.put("/:contactId", async (req, res, next) => {
  const response = await pls.updateContact(req.params.contactId, req.body);
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
  }
  if (response.message === "Not found") {
    res.status(404).json(response);
  } else if (response.message === "Your request is not in proper format.") {
    res.status(400).json(response);
  } else {
    res.status(200).json(response);
  }
});

module.exports = router;
