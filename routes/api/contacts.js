const express = require("express");
const router = express.Router();
const { controllerWrapper, validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

router.get("/", controllerWrapper(ctrl.getAllContacts));

router.get("/:contactId", controllerWrapper(ctrl.getContactById));

router.post("/", validation(contactSchema), controllerWrapper(ctrl.addContact));

router.delete("/:contactId", controllerWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validation(contactSchema),
  controllerWrapper(ctrl.updateContact)
);

module.exports = router;
