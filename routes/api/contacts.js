const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middelwares");
const { schemas } = require("../../models");

router.get("/", authenticate, ctrl.getAll);

router.get("/:id",authenticate, isValidId, ctrl.getById);

router.post("/",authenticate, validateBody(schemas.addShema), ctrl.add);

router.put("/:id",authenticate, isValidId, validateBody(schemas.addShema), ctrl.updateById);

router.patch("/:id/favorite",authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete("/:id",authenticate, isValidId, ctrl.deleteById);

module.exports = router;
