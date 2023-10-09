const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/controllers");
const isValidId = require("../../middlewares/isValidid");
const validateBody = require("../../middlewares/validateBody");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAllContacts);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateStatusContact),
  ctrl.updateStatusContact
);

router.delete("/:id", isValidId, ctrl.deleteContact);

module.exports = router;
