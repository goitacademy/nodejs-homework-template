const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/controllers");
const isValidId = require("../../middlewares/isValidid");
const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusContact),
  ctrl.updateStatusContact
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

module.exports = router;
