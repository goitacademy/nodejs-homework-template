const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { addSchema, updateSchema } = require("../../models");
const { authentication } = require("../../middlewares");

router.get("/", authentication, ctrl.getAll);

router.get("/:contactId", authentication, isValidId, ctrl.getById);

router.post("/", authentication, validateBody(addSchema), ctrl.add);

router.delete("/:contactId", authentication, isValidId, ctrl.remove);

router.put(
  "/:contactId",
  authentication,
  isValidId,
  validateBody(addSchema),
  ctrl.update
);

router.patch(
  "/:contactId/favorite",
  authentication,
  isValidId,
  validateBody(updateSchema),
  ctrl.updateStatusContact
);

module.exports = router;
