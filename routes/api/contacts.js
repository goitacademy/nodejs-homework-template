const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/constacts");

const { isValidId, validateBody } = require("../../middlewares");
const { contactSchema, favoriteSchema } = require("../../validators/validate");

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(contactSchema) ,ctrl.add);

router.delete("/:id", isValidId, ctrl.deleteById);

router.put("/:id", isValidId, validateBody(contactSchema), ctrl.updateById);

router.patch("/:id/favorite", isValidId, validateBody(favoriteSchema), ctrl.updateById);

module.exports = router;
