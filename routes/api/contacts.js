const express = require("express");
const controllers = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemasContact } = require("../../models");

const router = express.Router();

router.get("/", authenticate, controllers.getListContacts);

router.get("/:contactId", authenticate, isValidId, controllers.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemasContact.addSchema),
  controllers.addContact
);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemasContact.addSchema),
  isValidId,
  controllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemasContact.updateFavoriteSchema),
  isValidId,
  controllers.updateStatusContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  controllers.removeContact
);

module.exports = router;
