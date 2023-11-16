const express = require("express");
const router = express.Router();

const { idValidate, validate } = require("../../middlewares");

const {
    contactSchema,
    favoriteSchemaUpdate,
} = require("../../validation/contact");

const {
    getAll,
    getById,
    add,
    deleteById,
    updateById,
    updateFavorite,
} = require("../../controll/contacts");

router.get("/", getAll);

router.get("/:contactId", idValidate, getById);

router.post("/", validate(contactSchema), add);

router.delete("/:contactId", idValidate, deleteById);

router.put("/:contactId", idValidate, validate(contactSchema), updateById);

router.patch(
    "/:contactId/favorite",
    idValidate,
    validate(favoriteSchemaUpdate),
    updateFavorite
);

module.exports = router;