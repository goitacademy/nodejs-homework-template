
const express = require("express");

const { checkAuth, validation, ctrlWrapper } = require('../../middlewares');
const { joiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", checkAuth, ctrlWrapper(ctrl.listContacts));
router.get("/:contactId", checkAuth, ctrl.getContactById);
router.post(
    "/",
    checkAuth,
    validation(joiSchema),
    ctrlWrapper(ctrl.addContact)
);
router.delete("/:contactId", checkAuth, ctrlWrapper(ctrl.removeContact));
router.put(
    "/:contactId",
    checkAuth,
    validation(joiSchema),
    ctrlWrapper(ctrl.updateContact)
);
router.patch(
    "/:contactId/favorite",
    checkAuth,
    ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
