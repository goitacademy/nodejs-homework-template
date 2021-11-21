const express = require("express");
const router = express.Router();
const controllerContacts = require("../../controller");

router.get("/", controllerContacts.listContacts);

router.get("/:contactId", controllerContacts.getContactById);

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
