const express = require("express");
const ctrl = require("../../controll/contacts");
const router = express.Router();

const { idValidate, validate, validateFavorite } = require("../../middlewares");
const schemas = require("../../validation/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", idValidate, ctrl.getById);

router.post("/", validate(schemas.contactShema), ctrl.add);

router.delete("/:contactId", idValidate, ctrl.deleteById);

router.put(
    "/:contactId",
    idValidate,
    validate(schemas.contactShema),
    ctrl.updateById
);

router.patch(
    "/:contactId/favorite",
    idValidate,
    validateFavorite(schemas.favoriteSchemaUpdate),
    ctrl.updateFavorite
);

module.exports = router;