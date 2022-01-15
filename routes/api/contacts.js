const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const validation = require("../../validate/validate");
const { joiSchema, favoriteJoiSchema } = require("../../model");

const validateContact = validation(joiSchema);
const validateFavorite = validation(favoriteJoiSchema);

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateContact, ctrl.add);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", validateContact, ctrl.updateById);

router.patch("/:contactId/favorite", validateFavorite, ctrl.updateFavorite);

module.exports = router;
