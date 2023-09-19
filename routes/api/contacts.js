const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/constacts");

const { isValidId, validateBody, validateBodyFavorite} = require("../../middlewares");
const { contactSchema, favoriteSchema } = require("../../validators/validate");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(contactSchema) ,ctrl.add);

router.delete("/:id", isValidId, ctrl.deleteById);

router.put("/:id", isValidId, validateBody(contactSchema), ctrl.updateById);

router.patch("/:id/favorite", isValidId, validateBodyFavorite(favoriteSchema), ctrl.updateFavorite);

module.exports = router;
