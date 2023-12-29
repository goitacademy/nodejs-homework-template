const express = require("express"); // створюємо веб-сервер

const router = express.Router(); // створюємо router (це як записна книга, де по шляху можна побачити, що потрібно робити)

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middleswares");

const { schemas } = require("../../models/contact");

// по шляху '/' викликаємо ф-цію, яка повертає усі контакти
router.get("/", authenticate, ctrl.getAll);

// по шляху '/:contactId' викликаємо ф-цію, яка повертає контакт з id, який можна витягнути з req.params - параметри запиту
router.get("/:contactId", authenticate, isValidId, ctrl.getById);

// викликаємо ф-цію, яка у базу данних (файл json з даними добавить новий запис).
router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add); // contactMiddleware.checkCreateContactData,

// викликаємо ф-цію, яка видалить у базі данних запис з таким id
router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

// викликаємо ф-цію, яка запис по id замінить на новий запис
router.put("/:contactId", authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateById);

// зміна поля favorite
router.patch("/:contactId/favorite", authenticate, isValidId, ctrl.updateStatusContact);

module.exports = router;
