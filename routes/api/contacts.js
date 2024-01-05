const express = require("express");

const router = express.Router();
const contactsFoo = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsFoo.listContacts();
    console.log(contacts);
    res.status(200).json(contacts);
  } catch (error) {
    console.log("Error here");
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsFoo.getContactById(contactId);
    if (contact) {
      console.log(contact);
      res.status(200).json(contact);
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.log("Error here");
    next(error);
  }
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
