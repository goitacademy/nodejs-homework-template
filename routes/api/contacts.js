const express = require("express"); // Підключення модуля Express для створення роутера
const Joi = require("joi"); // Підключення модуля Joi для валідації даних
const ctrl = require("../../controllers/contacts"); // Підключення модуля контролера contacts
const { validateBody } = require("../../middlewares"); // Підключення мідлвари для валідації запиту

const router = express.Router(); // Створення роутера за допомогою Express

const addSchema = Joi.object({
  // Визначення схеми валідації для додавання контакту
  name: Joi.string().required(), // Вимагається рядок з ім'ям
  email: Joi.string().required(), // Вимагається рядок з електронною поштою
  phone: Joi.string().required(), // Вимагається рядок з номером телефону
});

router.route("/").get(ctrl.getAll).post();
router.get("/", ctrl.getAll); // Роут для отримання всіх контактів
router.get("/:contactId", ctrl.getById); // Роут для отримання контакту за його ідентифікатором
router.post("/", validateBody(addSchema), ctrl.addContact); // Роут для додавання контакту з використанням мідлвари валідації
router.delete("/:contactId", validateBody(addSchema), ctrl.deleteContact); // Роут для видалення контакту з використанням мідлвари валідації
router.put("/:contactId", validateBody(addSchema), ctrl.updateContact); // Роут для оновлення контакту з використанням мідлвари валідації

module.exports = router;
