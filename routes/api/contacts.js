const express = require("express");

const { contacts: controllers } = require("../../controllers");

const { validation, controllerWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const router = express.Router();

router.get("/", controllerWrapper(controllers.listContacts));

router.get("/:contactId", controllerWrapper(controllers.getContactById));

router.post(
  "/",
  validation(contactSchema),
  controllerWrapper(controllers.addContact)
);

router.delete("/:contactId", controllerWrapper(controllers.removeContact));

router.put(
  "/:contactId",
  validation(contactSchema),
  controllerWrapper(controllers.updateContact)
);

module.exports = router;
