const express = require("express");

const ctrl = require("../../controllers/contacts");
const { crtlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", crtlWrapper(ctrl.getAll));
router.get("/:id", crtlWrapper(ctrl.getById));
router.post("/", validateBody(schemas.addSchema), crtlWrapper(ctrl.add));
router.delete("/:id", crtlWrapper(ctrl.deleteById));
router.put(
  "/:id",
  validateBody(schemas.addSchema),
  crtlWrapper(ctrl.updateById)
);
router.patch(
  "/:id/favorite",
  validateBody(schemas.updateFavoriteSchema),
  crtlWrapper(ctrl.updateFavorite)
);

module.exports = router;
