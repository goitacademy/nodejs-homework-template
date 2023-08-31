const express = require("express");
const pls = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const response = await pls.listContacts();
  res.json(response);
});

router.get("/:contactId", async (req, res, next) => {
  const response = await pls.getContactById(req.params.contactId);
  if (response === undefined) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(response);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const response = await pls.removeContact(req.params.contactId);
  if (response.message === "Not found") {
    res.status(404).json(response);
  } else {
    res.status(200).json(response);
  }
});

router.post("/", async (req, res, next) => {
  const response = await pls.addContact(req.body);
  // const { name, email, phone } = req.body;
  res.json(response);
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
