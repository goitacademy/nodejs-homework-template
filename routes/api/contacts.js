const express = require("express");

const { contacts: controllers } = require("../../controllers");
const { validation, controllerWrapper } = require("../../middleware");
const { contactSchema } = require("../../schemas");

const validationMiddlewere = validation(contactSchema);

const router = express.Router();

router.get("/", controllerWrapper(controllers.getAll));

router.get("/:contactId", controllerWrapper(controllers.getById));

router.post(
  "/",
  validationMiddlewere,
  controllerWrapper(controllers.addContact)
);

router.put(
  "/:contactId",
  validationMiddlewere,
  controllerWrapper(controllers.updateContact)
);

router.delete("/:contactId", controllerWrapper(controllers.deleteContact));

module.exports = router;
