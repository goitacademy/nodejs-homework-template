const express = require("express");
// express для маршрутизації
const router = express.Router();
// створюємо сторінку записної книжки

const ctrl = require("../../controllers/contactsBook.js");

// отримання всіх контактів
router.get("/", ctrl.getAll);
// отримання 1 контакта по id
router.get("/:contactId", ctrl.getContactById);
//добавлення контакта
router.post("/", ctrl.addContact);
//видалення контакта по id
router.delete("/:contactId",  ctrl.deleteContact);
//зміна чогось в контакті по id
router.put("/:contactId",  ctrl.updateContact);
//зміна контакта на улюблений по id
router.patch("/:contactId/favorite",  ctrl.updateFavorite);

module.exports = router;
