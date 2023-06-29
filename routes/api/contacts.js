const express = require("express");
const router = express.Router();
const isValidId = require("../../middlewares/isValidId");
const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put("/:contactId", isValidId, ctrl.updateContact);
router.patch("/:contactId/favorite", isValidId, ctrl.updateStatusContact);

module.exports = router;
