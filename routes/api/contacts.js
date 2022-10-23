const express = require("express");
const { schemas } = require("../../models/contact");
const router = express.Router();
const { validBody, isValidId } = require("../../middleware");
const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validBody(schemas.contactsSchema), ctrl.add);

router.delete("/:id", isValidId, ctrl.deleteById);

router.put("/:id", isValidId, ctrl.updateById);
router.patch(
  "/:id/favorite",
  validBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);
module.exports = router;
