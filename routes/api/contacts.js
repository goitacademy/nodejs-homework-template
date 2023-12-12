const express = require("express"); // створюємо веб-сервер

const router = express.Router(); // створюємо router (це як записна книга, де по шляху можна побачити, що потрібно робити)

const ctrl = require("../../controllers/contacts");

// по шляху '/' викликаємо ф-цію, яка повертає усі контакти
router.get("/", ctrl.getAll);

// по шляху '/:contactId' викликаємо ф-цію, яка повертає контакт з id, який можна витягнути з req.params - параметри запиту
// router.get("/:contactId", ctrl.getById);

// викликаємо ф-цію, яка у базу данних (файл json з даними добавить новий запис).
router.post("/", ctrl.add);

// викликаємо ф-цію, яка видалить у базі данних запис з таким id
// router.delete("/:contactId", ctrl.deleteById);

// викликаємо ф-цію, яка запис по id замінить на новий запис
// router.put("/:contactId", ctrl.updateById);

module.exports = router;
