const express = require("express");
const { isValidId, validateBody } = require("../../middlewares");
const router = express.Router();
const { schemas } = require("../../models");
const controller = require("../../controllers/contacts");

router.get("/", controller.getContactRoute);

router.get("/:contactId", isValidId, controller.getContactRouteByID);

router.post(
  "/",
  validateBody(schemas.contactPush),
  controller.postContactRoute
);

router.delete("/:contactId", isValidId, controller.deleteContactRoute);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactPush),
  controller.putContactRoute
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  controller.updateStatusContact
);

module.exports = router;
