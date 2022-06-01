const express = require("express");

const { contacts: controllers } = require("../../controllers");

const { validation, controllerWrapper } = require("../../middlewares");
const { contactSchemaJoi, contactSchemaJoiFavorite } = require("../../models");

const router = express.Router();

router.get("/", controllerWrapper(controllers.listContacts));

router.get("/:contactId", controllerWrapper(controllers.getContactById));

router.post(
  "/",
  validation(contactSchemaJoi),
  controllerWrapper(controllers.addContact)
);

router.put(
  "/:contactId",
  validation(contactSchemaJoi),
  controllerWrapper(controllers.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validation(contactSchemaJoiFavorite),
  controllerWrapper(controllers.updateStatusContact)
);

router.delete("/:contactId", controllerWrapper(controllers.removeContact));

module.exports = router;
