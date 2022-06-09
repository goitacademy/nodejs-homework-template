const express = require("express");

const { contacts: controllers } = require("../../controllers");

const {
  validation,
  controllerWrapper,
  signupUser,
} = require("../../middlewares");
const { contactSchemaJoi, contactSchemaJoiFavorite } = require("../../models");

const router = express.Router();

router.get("/", signupUser, controllerWrapper(controllers.listContacts));

router.get("/:contactId", controllerWrapper(controllers.getContactById));

router.post(
  "/",
  signupUser,
  validation(contactSchemaJoi),
  controllerWrapper(controllers.addContact)
);

router.put(
  "/:contactId",
  signupUser,
  validation(contactSchemaJoi),
  controllerWrapper(controllers.updateContact)
);

router.patch(
  "/:contactId/favorite",
  signupUser,
  validation(contactSchemaJoiFavorite),
  controllerWrapper(controllers.updateStatusContact)
);

router.delete(
  "/:contactId",
  signupUser,
  controllerWrapper(controllers.removeContact)
);

module.exports = router;
