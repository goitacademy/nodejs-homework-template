const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const {
    addSchema,
    updateFavoriteSchema,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
    "/:contactId",
    isValidId,
    validateBody(addSchema),
    ctrl.updateContact
);

router.patch(
    "/:contactId/favorite",
    isValidId,
    validateBody(updateFavoriteSchema),
    ctrl.updateStatusContact
);

module.exports = router;