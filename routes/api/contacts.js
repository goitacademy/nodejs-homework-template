const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const validateBodyStatusUpdate = require("../../middlewares/validateBodyStatusUpdate");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.createContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyStatusUpdate(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
