const express = require("express");
const { ctrlWrapper } = require("../../helpers");

const ctrl = require("../../controllers/contactsControllers")

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getContactsController))

router.get("/:contactId", ctrlWrapper(ctrl.getContactByIdNewController))

router.post("/", ctrlWrapper(ctrl.addNewContactController))

router.put("/:contactId", ctrlWrapper(ctrl.editContactController))

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContactController))

router.patch("/:contactId/favorite", ctrlWrapper(ctrl.updateFavoriteByIdController))

module.exports = router;