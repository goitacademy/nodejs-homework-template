const express = require("express");

const isBodyEmpty = require("../../middlewares/isBodyEmpty");
const isValidId = require("../../middlewares/isValidId");
const router = express.Router();
const ctrl = require("../../controlers/contacts");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post(
  "/",
  isValidId,
  isBodyEmpty,
  validateBody(schemas.schema),
  ctrl.add
);

router.put(
  "/:contactId",
  isValidId,
  isBodyEmpty,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.delete("/:contactId", isValidId, ctrl.deleteById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isBodyEmpty,
  validateBody(schemas.patchSchema),
  ctrl.updateStatusContact
);

module.exports = router;
