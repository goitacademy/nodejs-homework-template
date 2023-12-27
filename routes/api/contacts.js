const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts"); // імпортуємо файл-інтерфейс для роботи із списком контактів

const { HttpError } = require("../../helpers");
//! НЕВІРНИЙ ЗАПИС:
//! const HttpError = require("../../helpers");  // отримаємо: "message": "HttpError is not a function"

const router = express.Router();

//! ------   Schema.validate  ------
//! -----  Joi-схема:  ----- (опис вимог до об'єкта)
// викликаємо метод'.object' якщо це для об'єкта:
const addSchema = Joi.object({
  title: Joi.string().required(), // title - це строка і він обов'язковий
  author: Joi.string().required(), // author - це строка і він обов'язковий
});

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
  try {
    //! ------   Schema.validate  ------
    // в Схемі викликаємо метод '.validate' і перевіряємо тіло об'єкта:
    // отримаємо об'єкт, де один з полів буде 'error':
    const { error } = addSchema.validate(req.body);
    // console.log(error);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
    //! ------   ЕТАП-1  ------
    // console.log(req.body);
    // const result = await contacts.addContact(req.body); //******/
    // res.status(201).json(result);  //******/
    // res.status(result.status).json(result); //! буде помилка:  "message": "Invalid status code: undefined"
  } catch (error) {
    next(error);
  }
  // res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
