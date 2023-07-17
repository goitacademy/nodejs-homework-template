const express = require("express");

const router = express.Router();

const { sсhemas } = require("../../models/contact");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(sсhemas.addSchema), ctrl.add);

router.put(
  "/:contactId",
  isValidId,
  authenticate,
  validateBody(sсhemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(sсhemas.updateStatusContact),
  ctrl.updateStatus
);
router.delete("/:contactId", isValidId, authenticate, ctrl.removeById);

module.exports = router;
