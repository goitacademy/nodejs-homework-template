const express = require("express");

const router = express.Router();

const controllers = require("../../Controllers/contacts");

const { ValidBody, isValidId, authenticate } = require("../../middleWars");

const schemas = require("../../models/contact");

router.get("/", authenticate, controllers.listContacts);

router.get("/:contactId", isValidId, authenticate, controllers.getContactById);

router.post(
  "/",
  ValidBody(schemas.AddSchema),
  authenticate,
  controllers.addContact
);

router.delete(
  "/:contactId",
  isValidId,
  authenticate,
  controllers.removeContact
);

router.put(
  "/:contactId",
  ValidBody(schemas.AddSchema),
  isValidId,
  authenticate,
  controllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  ValidBody(schemas.updateFavoriteSchema),
  isValidId,
  authenticate,
  controllers.updateFavorite
);

module.exports = router;
