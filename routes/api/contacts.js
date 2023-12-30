const express = require("express");

const contactsService = require("../../models/contacts");
const contactsControllers = require("../../controllers/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await contactsService.listContacts();
  res.json(data);
});

router.get("/:id", contactsControllers.getContactById);

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
