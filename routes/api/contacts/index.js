const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/contacts");
const guard = require("../../../helpers/guard"); // подключаем guard, чтобы правильно работал и подключился passport

const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
  validationMongoId,
} = require("./validation");

router.get("/", guard, controller.listContacts); // подключаем также логику passport, которая прописана в файле config/passport, чтобы незалогиненый пользователь не мог получить доступ к базе данных;  Оборачиваем guard

router.get("/:contactId", guard, validationMongoId, controller.getContactById);

router.post("/", guard, validationCreateContact, controller.addContact);

router.delete(
  "/:contactId",
  guard,
  validationMongoId,
  controller.removeContact
);

router.put(
  "/:contactId",
  guard,
  validationUpdateContact,
  validationMongoId,
  controller.updateContact
);

router.patch(
  "/:contactId/favorite",
  guard,
  validationUpdateStatusContact,
  controller.updateContact
);

module.exports = router;
