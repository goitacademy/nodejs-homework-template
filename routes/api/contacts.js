// а тут ми маєм написати логіку, тобто коли приходить запит за контактом, треба взяти контакт або додати з джейсону і повернути
// імпортуємо функції для роботи з контактами
const contacts = require("../../models/contacts");
// і використовуємо. Наприклад get-запит має повертати всі контакти

const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await contacts.listContacts();
    res.json({ results });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// req - інфо про запит який прийшов
// res - об'єкт який дозволяє налаштувати та відправити відповідь

router.get("/:contactId", async (req, res, next) => {
  console.log(req.params);
  try {
    const { contactId } = req.params;
    const results = await contacts.getContactById(contactId);
    if (!results) {
      const error = new Error("Not found");
      error.status = 404;
      throw error; // генерує помилку
      // якщо ми генеруємо помилку всередині try то відразу перевидаємось на catch
    }
    res.json(results); // відправляємо відповідь
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(500).json({
      message: "Server error",
    });
  }
});

// router.post("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

module.exports = router;
