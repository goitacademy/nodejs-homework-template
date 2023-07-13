const express = require("express");

const router = express.Router();

const controllers = require("../../Controllers/contacts");

const { ValidBody, isValidId } = require("../../middleWars");

const schemas = require("../../models/contact");

router.get("/", controllers.listContacts);

router.get("/:contactId", isValidId, controllers.getContactById);

router.post("/", ValidBody(schemas.AddSchema), controllers.addContact);

router.delete("/:contactId", isValidId, controllers.removeContact);

router.put(
  "/:contactId",
  ValidBody(schemas.AddSchema),
  isValidId,
  controllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  ValidBody(schemas.updateFavoriteSchema),
  isValidId,
  controllers.updateFavorite
);

module.exports = router;
