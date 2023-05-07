const express = require("express");
// express для маршрутизації
const router = express.Router();
// створюємо сторінку записної книжки
const { ctrl } = require("../../controllers");
const { authenticate } = require("../../middlewares");
//перевіряємо чи видавати інформацію на запит, чи залогінений юзер

//favorite контакти or отримання всіх контактів
router.get("/", authenticate, (req, res, next) => {
    const { favorite } = req.query;
    if (favorite === 'true') {
      return ctrl.getFavorite(req, res, next);
    }
    return ctrl.getAll(req, res, next);
  });
// отримання 1 контакта по id
router.get("/:contactId", authenticate, ctrl.getContactById);
// добавлення контакта
router.post("/", authenticate, ctrl.addContact);
// видалення контакта по id
router.delete("/:contactId", authenticate, ctrl.deleteContact);
// зміна чогось в контакті по id
router.put("/:contactId", authenticate, ctrl.updateContact);
// зміна контакта на улюблений по id
router.patch("/:contactId/favorite", authenticate, ctrl.updateFavorite);

module.exports = router;
