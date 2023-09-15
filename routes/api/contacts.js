const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts")

const {validateBody, isValidate} = require("../../middlewares");

const {schemas} = require("../../models/contact");

router.get("/", ctrl.getAll)

router.get("/:id", isValidate, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", isValidate, ctrl.deleteById);

router.put("/:id", isValidate, validateBody(schemas.addSchema), ctrl.updateById);

router.patch("/:id/favorite", validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router;