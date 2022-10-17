const express = require("express");
const controller = require("../../controllers/contacts");
const { controllerWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contact");
const router = express.Router();

router.get("/", controllerWrapper(controller.listContacts));

router.get("/:contactId", controllerWrapper(controller.getContactById));

router.post(
  "/",
  validateBody(schemas.addSchema),
  controllerWrapper(controller.addContact)
);

router.delete("/:contactId", controllerWrapper(controller.removeContact));

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  controllerWrapper(controller.updateContact)
);

module.exports = router;
