const express = require("express");

const router = express.Router();

// const { controllersContacts } = require("../../controllers");

// const {
//   getAllContacts,
//   getByIdContact,
//   addContact,
//   updateByIdContact,
//   updateStatusContact,
//   deleteByIdContact,
// } = controllersContacts;

router.get("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

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
