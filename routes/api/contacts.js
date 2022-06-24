const express = require("express");

const { validation, controllerWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: controller } = require("../../controllers");

const router = express.Router();

router.get("/", controllerWrapper(controller.listContacts));

router.get("/:contactId", controllerWrapper(controller.getContactById));

router.post(
  "/",
  validation(contactSchema),
  controllerWrapper(controller.addContact)
);

router.delete("/:contactId", controllerWrapper(controller.removeContact));

router.put(
  "/:contactId",
  validation(contactSchema),
  controllerWrapper(controller.updateContact)
);

module.exports = router;
