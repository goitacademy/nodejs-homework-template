const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middelwares");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addShema), ctrl.add);

router.put("/:id", isValidId, validateBody(schemas.addShema), ctrl.updateById);

router.patch("/:id/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete("/:id", isValidId, ctrl.deleteById);

module.exports = router;
