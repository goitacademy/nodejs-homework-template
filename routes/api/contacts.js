const express = require("express");
const ctrl = require("../../controll/contacts");
const router = express.Router();

const {
    idValidate,
    validate,
    validateFavorite,
    auth,
} = require("../../middlewares");
const schemas = require("../../validation/contact");

router.get("/", auth, ctrl.getAll);

router.get("/:contactId", auth, idValidate, ctrl.getById);

router.post("/", auth, validate(schemas.contactShema), ctrl.add);

router.delete("/:contactId", auth, idValidate, ctrl.deleteById);

router.put(
    "/:contactId",
    auth,
    idValidate,
    validate(schemas.contactShema),
    ctrl.updateById
);

router.patch(
    "/:contactId/favorite",
    auth,
    idValidate,
    validateFavorite(schemas.favoriteSchemaUpdate),
    ctrl.updateFavorite
);

module.exports = router;