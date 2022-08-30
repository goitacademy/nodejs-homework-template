const express = require('express');

const ctrl = require("../../controllers/contacts");

const {ctrlWrapper} = require("../../helpers");

const { validationBody, isValidId,authenticate } = require("../../middlewares");

const {schemas} = require("../../models/contacts");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, validationBody(schemas.add), ctrlWrapper(ctrl.add));

router.put("/:id", isValidId, validationBody(schemas.add), ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", isValidId, validationBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavorite));

router.delete("/:id", isValidId,ctrlWrapper(ctrl.removeById));

module.exports = router
