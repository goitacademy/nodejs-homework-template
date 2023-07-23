const express = require("express");

const isBodyEmpty = require("../../utils/isBodyEmpty");
const isValidId = require("../../utils/isValidId");
const router = express.Router();
const ctrl = require("../../controlers/contacts");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", isBodyEmpty, validateBody(schemas.schema), ctrl.add);

router.put(
  "/:contactId",
  isBodyEmpty,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.delete("/:contactId", ctrl.deleteById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isBodyEmpty,
  validateBody(schemas.patchSchema),
  ctrl.updateStatusContact
);

module.exports = router;
