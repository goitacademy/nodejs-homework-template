const express = require("express");
const router = express.Router();

// функция обработчик запросов называються Контроллеры они могут быть вынесены в отдельные файлы
const {
  getContacts,
  getContactId,
  postContacts,
  deleteContact,
  putContact,
  patchContact,
} = require("../../controllers/contactsController");
const {
  validationData,
  patchValidation,
} = require("../../middlwarer/validation");

router.get("/", getContacts);
router.get("/:contactId", getContactId);
router.post("/", validationData, postContacts);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", validationData, putContact);
router.patch("/:contactId", patchValidation, patchContact);

module.exports = router;
