const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const {isValidId} = require("../../middlewares")

const ctrl = require("../../controllers/contactsControllers")

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getContactsController))

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactByIdNewController))

router.post("/", ctrlWrapper(ctrl.addNewContactController))

router.put("/:contactId", isValidId, ctrlWrapper(ctrl.editContactController))

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteContactController))

router.patch("/:contactId/favorite", isValidId, ctrlWrapper(ctrl.updateFavoriteByIdController))

module.exports = router;