// в цей файл винесені всі маршрути які стосуюсться контактів

const express = require("express");
const router = express.Router(); // створюємо "сторінку записної книжки"

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const schemas = require("../../shemas/contacts");

// створюємо мартшрути
// отритмання всіх контактів
router.get("/", ctrl.getListContacts);

// отримання контакту по id
router.get("/:contactId", isValidId, ctrl.getContactById);

// додавання контакту
router.post("/", validateBody(schemas.addSchema, "add"), ctrl.addContacts);

// видалення контакту
router.delete("/:contactId", ctrl.removeContacts);

// внесення змін до контакту
router.put("/:contactId", [
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact,
]);

// оновлення поля favorite
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
