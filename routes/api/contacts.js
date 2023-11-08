const express = require("express");
const controller = require("../../controllers/contacts");
const { schemas } = require("../../models/contact");
const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", controller.listContacts);

router.get("/:contactId", isValidId, controller.getContactById);

router.post("/", validateBody(schemas.addSchema), controller.addContact);

router.delete("/:contactId", isValidId, controller.removeContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  controller.updateContactById
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updFavoriteSchema),
  controller.updateFavorite
);

module.exports = router;
