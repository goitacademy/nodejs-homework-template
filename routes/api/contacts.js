const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { schemas } = require("../../models/contact");
const { isValidId, validateBody } = require("../../middlewares");

router.get("/", ctrl.getAllContacts);

router.get("/:id", isValidId, ctrl.getByID);

router.post("/", validateBody(schemas.addSchema), ctrl.postContact);

router.delete("/:id", isValidId, ctrl.deleteContact);

router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
