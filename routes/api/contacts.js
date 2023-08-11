// в цей файл винесені всі маршрути які стосуюсться контактів

const express = require("express");

const router = express.Router(); // створюємо "сторінку записної книжки"

const ctrl = require("../../controllers/contacts");

const validateBody = require("../../middlewares");

const schemas = require("../../shemas/contacts");

// створюємо мартшрути
// для уникнення повторення коду, третім аргументом вказуємо next який передаємо в catch та який приймає error, тобто next буде шукати обробник помилок. Обробник помилок це функція яка приймає 4 параметри. В нашому випадку така функція знаходиться в app.js

// отритмання всіх контактів
router.get("/", ctrl.getListContacts);

// отримання контакту по id
router.get("/:contactId", ctrl.getContactById);

// додавання контакту
router.post("/", validateBody(schemas.addSchema, "add"), ctrl.addContacts);

// видалення контакту
router.delete("/:contactId", ctrl.removeContacts);

// внесення змін до контакту
router.put(
  "/:contactId",
  validateBody(schemas.addSchema, "update"),
  ctrl.updateContact
);

module.exports = router;

// ===============================================================
/**
 * коли у міделварі яка вказує серверу де знаходяться маршрути для всіх запитів конкретного об'єкту, в нашому випадку - /api/contacts, у маршпутах початкове значення адреси запиту - тобто /api/contacts зазначати не треба. Достатньо зазначити тільки слеш - "/"
 * 
 ** замість 
 * router.get("/api/contacts", async (req, res, next) => {
  res.json({ message: "template message" });
 * 
 ** зазначаємо 
 * router.get("/", async (req, res, next) => {
  res.json({ message: "template message" });
});
 * 
 */

/**
 * Створення помилки в try.
 * const error = new Error("Not Found");
 * error.status = 404;
 * throw error;
 * return res.status(404).json({ message: "Not Found" });
 *
 * Проблема данного підходу полягає в тому що цей код буде повторюватись у зв'язку з чим код стає "брудним"
 * Щоб цього уникннути можна створити функцию генерації помилку яку винести в окремий файл.
 * В параметри запитів додати третій параметр - next який буде обробляти помилку
 *
 */
