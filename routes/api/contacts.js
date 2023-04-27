const express = require("express");
const router = express.Router();
const isValidId = require("../../middlewares/isVaildId");

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deleteContacts);

router.put("/:contactId", isValidId, ctrl.changeContact);

router.patch("/:contactId/favorite", isValidId, ctrl.updateFavorite);

module.exports = router;
