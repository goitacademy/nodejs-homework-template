const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { isValidId, validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../utils/validation");

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:id", authenticate, isValidId, ctrl.getByID);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.postContact
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
