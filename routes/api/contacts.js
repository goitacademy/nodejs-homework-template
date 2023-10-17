import express from "express";
const router = express.Router();

// импотрируем функции работі с контактами
// const contactsOperations = require("../../models/contacts");
import contactsOperations from "../../models/contacts.js";

// const contactsOBJ = require("../../models/contacts.json");

// Тут другий агрумент називається контроллер
router.get("/", async (req, res, next) => {
  const contactList = await contactsOperations.listContacts();
  res.json(contactList);
  // res.statusCode();
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

export default router;
