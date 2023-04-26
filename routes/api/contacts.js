const express = require("express");

const controllers = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const schema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", controllers.getAllContacts);

router.get("/:contactId", isValidId, controllers.getContactById);

router.post("/", validateBody(schema.addSchema), controllers.addContact);

router.delete("/:contactId", isValidId, controllers.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schema.addSchema),
  controllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schema.updateFavoriteSchema),
  controllers.updateFavorite
);

module.exports = router;
