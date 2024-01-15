const express = require("express");

const router = express.Router(); //Этот объект позволяет группировать обработчики маршрутов, связанные с определенными путями URL то есть создает страничку записной книжки, а не новую книжку

const ctrl = require("../../controllers/contacts"); // контроллеры те функции, которые обрабатывают запросы к определенным маршрутам (или эндпоинтам) в API (route handlers)

const { isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, ctrl.addContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);

// PUT запрос всегда все обновляет => если мы что-то меняем, то перезаписываем полностью наше элемент и вводим все поля, и те которые изменились, и те которые нет
router.put("/:contactId", authenticate, isValidId, ctrl.updateContact);

// !частичное обновление (толькое favorite)
router.patch("/:contactId/favorite", authenticate, isValidId, ctrl.updateFavorite);

module.exports = router;
