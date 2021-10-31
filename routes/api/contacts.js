const express = require("express");
const router = express.Router();

const contactsControllers = require("../../controllers/contacts");

/**
 * 1.Получить все контакты
 * 2.Получить один контакт по id
 * 3.Добавить новый контакт
 * 4.Удалить контакт по id
 * 5.Обновить контакт по id
 */

router.get("/", contactsControllers.listContactsController);

router.get("/:contactId", contactsControllers.getContactByIdController);

router.post("/", contactsControllers.addContactController);

router.delete("/:contactId", contactsControllers.removeContactController);

router.put("/:contactId", contactsControllers.updateByIdController);

module.exports = router;
