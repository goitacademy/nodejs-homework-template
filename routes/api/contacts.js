const express = require("express");
const router = express.Router();
const {
  contactsSchemaJoi,
  updateFavoriteStatusSchemaJoi,
} = require("../../models/contacts");
const { contacts: ctrl } = require("../../controllers");
const { controllerWrapper, validation } = require("../../middlewares");

router.get("/", controllerWrapper(ctrl.listContacts));

router.get("/:contactId", controllerWrapper(ctrl.getContactById));

router.post(
  "/",
  validation(contactsSchemaJoi),
  controllerWrapper(ctrl.addContact)
);

router.delete("/:contactId", controllerWrapper(ctrl.removeContactById));

router.put(
  "/:contactId",
  validation(contactsSchemaJoi),
  controllerWrapper(ctrl.updateContactById)
);

router.patch(
  "/:contactId/favorite",
  validation(updateFavoriteStatusSchemaJoi),
  controllerWrapper(ctrl.updateFavoriteStatus)
);

module.exports = router;
