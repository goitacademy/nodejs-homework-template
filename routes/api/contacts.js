const express = require("express");
const ContactsController = require("../../controllers/ContactsController");
const authenticate = require("../../middlewares/authenticate");
const validateId = require("../../middlewares/validateId");

const router = express.Router();

router.get("/", authenticate, validateId, ContactsController.getAllContacts);

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
