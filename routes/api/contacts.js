const express = require("express");

const controllers = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const schema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", authenticate, controllers.getAllContacts);

router.get("/:contactId", authenticate, isValidId, controllers.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schema.addSchema),
  controllers.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  controllers.deleteContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schema.addSchema),
  controllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schema.updateFavoriteSchema),
  controllers.updateFavorite
);

module.exports = router;
