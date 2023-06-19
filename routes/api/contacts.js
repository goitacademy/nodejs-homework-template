const express = require("express");
const router = express.Router();
const { schemas } = require("../../models/contact");
const controllers = require("../../controllers/constacts");
const { validateBody, isValidId } = require("../../middlewares");

router.get("/", controllers.getAll);

router.get("/:contactId", isValidId, controllers.getById);

router.post(
  "/",
  validateBody(schemas.validationSchema),
  controllers.addContact
);

router.delete("/:contactId",isValidId, controllers.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.validationSchema),
  controllers.changeContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.favoriteSchema),
  controllers.updateStatusContact
);

module.exports = router;
