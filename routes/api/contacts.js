const express = require("express");

// const isBodyEmpty = require("../../middlewares/isBodyEmpty");
// const isValidId = require("../../middlewares/isValidId");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {
  validateBody,
  isValidId,
  authentication,
  isBodyEmpty,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authentication, ctrl.getAll);

router.get("/:contactId", authentication, isValidId, ctrl.getById);

router.post(
  "/",
  authentication,
  isBodyEmpty,
  validateBody(schemas.addSchema),
  ctrl.add
);

router.put(
  "/:contactId",
  authentication,
  isValidId,
  isBodyEmpty,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.delete("/:contactId", authentication, isValidId, ctrl.deleteById);

router.patch(
  "/:contactId/favorite",
  authentication,
  isValidId,
  isBodyEmpty,
  validateBody(schemas.patchSchema),
  ctrl.updateStatusContact
);

module.exports = router;
