const express = require("express");

const controller = require("../../controllers/contacts/index");

const { controllerWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contact");

const router = express.Router();

router.get("/", controllerWrapper(controller.listContacts));

router.get("/:contactId", controllerWrapper(controller.getContactById));

router.post(
  "/",
  validateBody(schemas.contactsSchema),
  controllerWrapper(controller.addContact)
);

router.delete("/:contactId", controllerWrapper(controller.removeContact));

router.put(
  "/:contactId",
  validateBody(schemas.contactsSchema),
  controllerWrapper(controller.updateContact)
);

module.exports = router;
