const express = require("express");
const router = express.Router();

const constactsController = require("../../controllers");
const { schemas } = require("../../models/contact");
const { validateData, checkBody, isValidId } = require("../../middlewares");

router.get("/", constactsController.getContacts);
router.get("/:contactId", isValidId, constactsController.getContact);
router.post(
    "/",
    checkBody,
    validateData(schemas.requiredFieldsSchema),
    constactsController.addContact
);
router.delete("/:contactId", isValidId, constactsController.deleteContact);
router.put(
    "/:contactId",
    isValidId,
    checkBody,
    validateData(schemas.requiredFieldsSchema),
    constactsController.updateContact
);

router.patch(
    "/:contactId/favorite",
    isValidId,
    validateData(schemas.updateFavoriteSchema),
    constactsController.updateStatusContact
);

module.exports = router;