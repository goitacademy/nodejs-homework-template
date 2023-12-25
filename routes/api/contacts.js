const express = require("express");

const contacts = require("../../models/contacts"); // імпортуємо файл-інтерфейс для роботи із списком контактів

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res) => {
  // console.log(req.params.contactId);
  // console.log(req.params);
  try {
    const { contactId } = req.params; // Зчитуємо цей Id
    const result = await contacts.getContactById(contactId);
    // Якщо база даних відправила null, значить id неправильний:
    if (!result) {
      // Перервали виконання return-ом, бо `res.json()` не перериває
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
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
