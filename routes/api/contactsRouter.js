const express = require("express");
const controllers = require("../../contollers/contactsControllers");

const validateBody = require("../../middleware/validateBody");
const authenticate = require("../../middleware/authenticate");
const { schemas } = require("../../models/contactModel");

const router = express.Router();

router.get("/", authenticate, controllers.listContacts);

router.get("/:contactId", authenticate, controllers.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  controllers.addContact
);

router.delete("/:contactId", authenticate, controllers.removeContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateStatusContact
);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addSchema),
  controllers.updateContact
);

module.exports = router;
