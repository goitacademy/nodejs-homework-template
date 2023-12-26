const express = require("express");

const contacts = require("../../models/contacts"); // імпортуємо файл-інтерфейс для роботи із списком контактів

const { HttpError } = require("../../helpers");
//! НЕВІРНИЙ ЗАПИС:
//! const HttpError = require("../../helpers");  // отримаємо: "message": "HttpError is not a function"

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
    //! ------   ВАРІАНТ-1  ------
    // можна і без 'return':    res.status(500).json({
    // return res.status(500).json({
    //   message: "Server error",
    // });
  }
});

router.get("/:contactId", async (req, res, next) => {
  // console.log(req.params.contactId);
  // console.log(req.params);
  try {
    const { contactId } = req.params; // Зчитуємо цей Id
    const result = await contacts.getContactById(contactId);
    // Якщо база даних відправила null, значить id неправильний:
    if (!result) {
      throw HttpError(404, "Not found WHAT"); //! Перевіряємо в Постман, вводячи невірний ID
      //! ------   ВАРІАНТ-2  ------
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;
      //! ------   ВАРІАНТ-1  ------
      //* Перервали виконання return-ом, бо `res.json()` не перериває:
      // return res.status(404).json({
      //   message: "Not found",
      // });
    }
    res.json(result);
  } catch (error) {
    next(error); //! `Next` буде шукати обробник помилок – ф-цію, яка має 4 параметри
    //! ------   ВАРІАНТ-2  ------
    //* Якщо помилка в середині `try` – ми її викидаємо і вже в середині `catch` її відправляємо:
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({
    //   message,
    // });
    //! ------   ВАРІАНТ-1  ------
    // res.status(500).json({
    //   message: "Server error",
    // });
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
