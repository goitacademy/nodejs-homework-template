const express = require("express");

const router = express.Router();
const contactsFoo = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsFoo.listContacts();
    console.log(contacts);
    res.status(200).json(contacts);
  } catch (error) {
    console.log("error here");
    next(error);
  }
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
