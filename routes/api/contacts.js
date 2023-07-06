const express = require("express");

const ctrl = require("../../controllers/contacts");
const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../middlewares/validateBody");
const { schemas } = require("../../models/contact");
const validateFavorite = require("../../middlewares/validateFavorite");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateFavorite,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
