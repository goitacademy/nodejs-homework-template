const express = require("express");
const ctrl = require("../../controllers/contacts");
const { isValidId } = require("../../middlewares/isValidId");
const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getOneContact);

router.post("/", ctrl.addNewContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put("/:contactId", isValidId, ctrl.updateContactById);

router.patch("/:contactId/favorite", isValidId, ctrl.updateContactFavorite);

module.exports = router;
