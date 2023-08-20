// в цей файл винесені всі маршрути які стосуюсться контактів

const express = require("express");
const router = express.Router(); // створюємо "сторінку записної книжки"

const ctrl = require("../../controllers/contacts");

const {
  validateBody,
  isValidId,
  authentificate,
} = require("../../middlewares");

const schemas = require("../../shemas/contacts");

// створюємо мартшрути
// отритмання всіх контактів
router.get("/", authentificate, ctrl.getListContacts);

// отримання контакту по id
router.get("/:contactId", authentificate, isValidId, ctrl.getContactById);

// додавання контакту
router.post(
  "/",
  authentificate,
  validateBody(schemas.addSchema, "add"),
  ctrl.addContacts
);

// видалення контакту
router.delete("/:contactId", authentificate, isValidId, ctrl.removeContacts);

// внесення змін до контакту
router.put("/:contactId", [
  authentificate,
  isValidId,
  validateBody(schemas.addSchema, "update"),
  ctrl.updateContact,
]);

// оновлення поля favorite
router.patch(
  "/:contactId/favorite",
  authentificate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema, "updateStatus"),
  ctrl.updateStatusContact
);

module.exports = router;
