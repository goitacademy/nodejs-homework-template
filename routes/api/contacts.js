const express = require("express");
const {
  validation,
  validateStatus,
  controllerShell,
  IdValidation,
} = require("../../middlewares");
const { schemas } = require("../../models");
const { contacts: controller } = require("../../controllers");

const router = express.Router();

router.get("/", controllerShell(controller.getContacts));

router.get("/:id", IdValidation, controllerShell(controller.checkByID));

router.post("/", controllerShell(controller.createContact));

router.delete("/:id", IdValidation, controllerShell(controller.deleteContact));

router.put(
  "/:id",
  IdValidation,
  validation(schemas.updateAfterChangeContact),
  controllerShell(controller.changeContact)
);

router.patch(
  "/:id/favorite",
  IdValidation,
  validateStatus(schemas.favoriteSchema),
  controllerShell(controller.updateFavoriteContact)
);

module.exports = router;
