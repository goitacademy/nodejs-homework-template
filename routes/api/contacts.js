const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { isValidId } = require("../../middlewares");

router.get("/", ctrl.getListContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", isValidId, ctrl.updateById);

router.patch("/:contactId/favorite", isValidId, ctrl.updateFavorite);

module.exports = router;