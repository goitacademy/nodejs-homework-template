const express = require("express");

const controller = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", controller.listContacts);

router.get("/:contactId", isValidId, controller.getContactById);

router.post("/", validateBody(schemas.joiSchema), controller.addContact);

router.delete("/:contactId", isValidId, controller.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.joiSchema),
  controller.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.joiFavoriteSchema),
  controller.updateFavorite
);

module.exports = router;
