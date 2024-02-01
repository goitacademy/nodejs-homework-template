const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");

const { isValidId, validateBody, authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getOne);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

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
  validateBody(schemas.favoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeById);

module.exports = router;
