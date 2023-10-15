const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers");
const { validateBody, isValidId } = require("../../../middlewares");
const { addSchema, updateSchema } = require("../../../models");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(addSchema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.remove);

router.put("/:contactId", isValidId, validateBody(addSchema), ctrl.update);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateSchema),
  ctrl.updateStatusContact
);

module.exports = router;
