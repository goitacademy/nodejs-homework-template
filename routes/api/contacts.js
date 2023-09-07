const express = require("express"); // Підключення модуля Express для створення роутера
const ctrl = require("../../controllers/contacts"); // Підключення модуля контролера

const router = express.Router();

router.get("/", ctrl.getAll); // Роут для отримання всіх контактів
router.get("/:contactId", ctrl.getById); // Роут для отримання контакту за його ідентифікатором
router.post("/", ctrl.addContact); // Роут для додавання контакту з використанням мідлвари валідації
router.delete("/:contactId", ctrl.deleteContact); // Роут для видалення контакту з використанням мідлвари валідації
router.put("/:contactId", ctrl.updateContact); // Роут для оновлення контакту з використанням мідлвари валідації

module.exports = router;
