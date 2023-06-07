const express = require("express");
const { validation, isValidId } = require("../../middlewares");
const controller = require("../../controllers/contacts-controller");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", controller.getContactsAll);

router.get("/:contactId", isValidId, controller.getContactById);

router.post("/", validation(schemas.schemaAddContact), controller.addContact);

router.delete("/:contactId", isValidId, controller.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validation(schemas.schemaUpdateContact),
  controller.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateFavoriteSchema),
  controller.updateFavorite
);

module.exports = router;
