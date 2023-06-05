const express = require("express");
const router = express.Router();

const schemas = require("../../schemas/contacts");
const controllers = require("../../controllers/contacts");
const {
  isValidId,
  bodyValidatorWrapper,
  favoriteFieldValidationWrapper,
} = require("../../middlewares");

router.get("/", controllers.getAllContacts);

router.get("/:contactId", isValidId, controllers.getContactById);

router.post(
  "/",
  bodyValidatorWrapper(schemas.contactsSchema),
  controllers.addContact
);

router.delete("/:contactId", isValidId, controllers.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  bodyValidatorWrapper(schemas.contactsSchema),
  controllers.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  favoriteFieldValidationWrapper(schemas.contactStatus),
  controllers.updateStatusContact
);

module.exports = router;
