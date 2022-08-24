const express = require("express");
const controller = require("../../controlers/contacts");
const { controllerWrapper } = require("../../helpers");
const { validationBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", controllerWrapper(controller.getAll));

router.get("/:contactId", isValidId, controllerWrapper(controller.getById));

router.post("/", validationBody(schemas.addSchema), controllerWrapper(controller.add));

router.put("/:contactId", isValidId, validationBody(schemas.addSchema), controllerWrapper(controller.updateContactId));

router.patch(
  "/:contactId/favorite",
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  controllerWrapper(controller.updateStatusContact)
);

router.delete("/:contactId", isValidId, controllerWrapper(controller.deleteContact));

module.exports = router;
