const express = require("express");
const { validateBody } = require("../../helpers");
const { schemas } = require("../../models/contact");
const router = express.Router();
const controllers = require("../../controllers");
const isValidId = require("../../middlewares");

router.get("/", controllers.getListController);

router.get("/:contactId", isValidId, controllers.getContactController);

router.post(
  "/",
  validateBody(schemas.addScheme),
  controllers.postContactController
);

router.delete("/:contactId", isValidId, controllers.deleteContactController);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addScheme),
  controllers.putContactController
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavScheme),
  controllers.updateStatusContact
);

module.exports = router;
