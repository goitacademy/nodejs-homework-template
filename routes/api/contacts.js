const express = require("express");

const ctrl = require("../../controllers/contact");
const {schemas} = require("../../models/contact");
const { validateBody, isValidid } = require("../../middlewares");
const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidid, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:contactId", isValidid, ctrl.removeById);

router.put(
  "/:contactId",
  isValidid,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidid,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
