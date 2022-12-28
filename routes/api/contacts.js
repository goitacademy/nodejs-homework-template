const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put(
  "/:id",
  authenticate,
  validateBody(schemas.updateContactSchema),
  ctrl.apdateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  validateBody(schemas.updateStatusContactSchema),
  ctrl.updateStatusContact
);

router.delete("/:id", authenticate, ctrl.deleteById);

module.exports = router;
