const express = require("express");

const router = express.Router();

const controller = require("../../controllers/contacts/index");

const { controllerWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", controllerWrapper(controller.getAll));

router.get("/:contactId", controllerWrapper(controller.getContactById));

router.post(
  "/",
  validateBody(schemas.addSchema),
  controllerWrapper(controller.addContact),
);

router.delete("/:contactId", controllerWrapper(controller.removeContact));

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  controllerWrapper(controller.updateById),
);

module.exports = router;
