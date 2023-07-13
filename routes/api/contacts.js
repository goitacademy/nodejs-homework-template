const express = require("express");

const router = express.Router();

const { sсhemas } = require("../../models/contact");

const { validateBody, isValidId } = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(sсhemas.addSchema), ctrl.add);

router.patch(
  "/:contactId/favorite",
  validateBody(sсhemas.updateStatusContact),
  ctrl.updateStatus
);
router.delete("/:contactId",isValidId, ctrl.removeById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(sсhemas.addSchema),
  ctrl.updateById
);

module.exports = router;
