const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
} = require("../../models/contacts.js");
// const { jsonResponse } = require("../../utils/index.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  listContacts()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  getContactById(contactId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  removeContact(contactId)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
