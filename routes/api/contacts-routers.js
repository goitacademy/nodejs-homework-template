// ! Маршрути для одного об'єкту
import express from "express";
const router = express.Router();

// импотрируем функции работі с контактами
// const contactsOperations = require("../../models/contacts");
import contactsOperations from "../../models/contacts.js";
import contactsController from "../../controllers/contacts-controller.js";
import { validateBody } from "../../decorators/index.js";
import {
  movieAddSchema,
  movieUpdateSchema,
} from "../../schemas/contacts-schemas.js";
// Тут другий агрумент називається контроллер
router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", validateBody(movieAddSchema), contactsController.addContact);

// Не отримує body
// Отримує параметр id
// Викликає функцію removeContact для роботи з json-файлом contacts.json
// якщо такий id є, повертає json формату {"message": "contact deleted"} і статусом 200
// якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404
router.delete("/:contactId", contactsController.removeContactById);

// Отримує параметр id
// Отримує body в json-форматі c оновленням будь-яких полів name, email и phone
// Якщо body немає, повертає json з ключем {"message": "missing fields"} і статусом 400
// Якщо з body всі добре, викликає функцію updateContact(contactId, body). (Напиши її) для поновлення контакту в файлі contacts.json
// За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем "message": "Not found" і статусом 404
router.put(
  "/:contactId",
  validateBody(movieUpdateSchema),
  contactsController.updateContactById
);

export default router;
