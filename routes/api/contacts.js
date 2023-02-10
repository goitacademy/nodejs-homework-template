const express = require("express");
const router = express.Router();

// const {
//   Contact,
//   joiSchema,
//   joiSchemaUpdate,
//   joiSchemaFavorite,
// } = require("../../models/contact");

const { contact: ctrl } = require("../../controllers");

// Показати всі контакти
router.get("/", ctrl.getAll);

// Знайти контакт по id
router.get("/:id", ctrl.getById);

// Додавання нового контакту
router.post("/", ctrl.add);

// Видалення контакту
router.delete("/:id", ctrl.deleteContact);

// Зміна значення поля по id
router.put("/:id", ctrl.change);

// Зміна значення одного поля
router.patch("/:id/favorite", ctrl.changeOneProp);

module.exports = router;
