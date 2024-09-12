const express = require("express");
const ctrl = require("../../controllers/contacts");
const { isValidId, validateBody } = require("../../middlewares");
const { shemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(shemas.addShema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.del);

router.put("/:contactId", isValidId, validateBody(shemas.addShema), ctrl.edit);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(shemas.updateFavoriteShema),
  ctrl.editFavorite
);

module.exports = router;
