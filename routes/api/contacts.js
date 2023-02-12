const express = require("express");
const router = express.Router();

const {
  joiSchema,
  joiSchemaUpdate,
  joiSchemaFavorite,
} = require("../../models/contact");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { contact: ctrl } = require("../../controllers");

// Показати всі контакти
router.get("/", auth, ctrlWrapper(ctrl.getAll));

// Знайти контакт по id
router.get("/:id", ctrlWrapper(ctrl.getById));

// Додавання нового контакту
router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));

// Видалення контакту
router.delete("/:id", ctrlWrapper(ctrl.removeContact));

// Зміна значення поля по id
router.put("/:id", validation(joiSchemaUpdate), ctrlWrapper(ctrl.change));

// Зміна значення одного поля
router.patch(
  "/:id/favorite",
  validation(joiSchemaFavorite),
  ctrlWrapper(ctrl.changeOneProp)
);

module.exports = router;
