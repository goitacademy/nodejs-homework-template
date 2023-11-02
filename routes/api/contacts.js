// а тут ми маєм написати логіку, тобто коли приходить запит за контактом, треба взяти контакт або додати з джейсону і повернути
// імпортуємо функції для роботи з контактами
const contacts = require("../../models/contacts");
// і використовуємо. Наприклад get-запит має повертати всі контакти

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const results = await contacts.listContacts();
    res.json(results);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// req - інфо про запит який прийшов
// res - об'єкт який дозволяє налаштувати та відправити відповідь

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const results = await contacts.getById(id);

    if (!results) {
      const error = new Error("Not found");
      error.status = 404;
      throw error; // генерує помилку
      // якщо ми генеруємо помилку всередині try то відразу перевидаємось на catch
    }
    res.json(results); // відправляємо відповідь
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      const error = new Error("missing required name field");
      error.status = 400;
      throw error;
    }
    const results = await contacts.addContact(name, email, phone);
    res.status(201).json(results);
  } catch (error) {
    if (error.status === 400) {
     return res.status(400).json({
        message: error.message,
      });
    }
   return res.status(500).json({
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
