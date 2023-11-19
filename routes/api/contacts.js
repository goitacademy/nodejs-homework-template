const express = require("express");
const controller = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, controller.listContacts);

router.get("/:contactId", authenticate, isValidId, controller.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  controller.addContact
);

router.delete("/:contactId", authenticate, isValidId, controller.removeContact);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addSchema),
  controller.updateContactById
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updFavoriteSchema),
  controller.updateFavorite
);

module.exports = router;
