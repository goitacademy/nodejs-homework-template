const express = require("express");
const router = express.Router();

const { listContacts, getContactById } = require("../../models/contacts");

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;

// router.get("/", async (req, res, next) => {
//   res.json({ listContacts, message: "list of contacts" });
// });

// router.get("/:contactId", async (req, res, next) => {
//   res.json({ message: "contact by id" });
// });

// router.post("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });
