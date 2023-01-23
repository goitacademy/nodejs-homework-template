const express = require("express");
const {
    validation,
    ctrlWrapper,
    isValidId,
    checkJwt,
    checkUniqData,
} = require("../../middlewares");
const { joiContactsSchemas } = require("../../models");
const { contacts: ctrl } = require("../../controller");

const router = express.Router();

router.get("/", checkJwt, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", checkJwt, isValidId, ctrlWrapper(ctrl.getById));

router.post(
    "/",
    checkJwt,
    validation(joiContactsSchemas.contactsSchema),
    checkUniqData,
    ctrlWrapper(ctrl.add)
);

router.delete("/:contactId", checkJwt, isValidId, ctrlWrapper(ctrl.remove));

router.put(
    "/:contactId",
    checkJwt,
    isValidId,
    validation(joiContactsSchemas.contactsSchema),
    checkUniqData,
    ctrlWrapper(ctrl.update)
);

router.patch(
    "/:contactId/favorite",
    checkJwt,
    isValidId,
    validation(joiContactsSchemas.favoriteSchema),
    ctrlWrapper(ctrl.patch)
);

module.exports = router;
