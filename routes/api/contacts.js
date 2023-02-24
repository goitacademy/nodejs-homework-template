const express = require("express");
const ctrl = require("../../controllers/contactsController");
const { schemas } = require("../../models/contact");
const { validateBody, isValidId } = require("../../middleware");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateById);

router.patch(
  "/:id/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateById
);

router.delete("/:id", ctrl.removeById);

module.exports = router;
