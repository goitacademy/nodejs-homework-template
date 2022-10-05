const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { idValidation, auth } = require("../../middlewares");

router.get("/", auth, ctrl.listContacts);

router.get("/:contactId", idValidation, ctrl.getContactById);

router.post("/", auth, ctrl.addContact);

router.delete("/:contactId", idValidation, ctrl.removeContact);

router.put("/:contactId", idValidation, ctrl.updateById);

router.patch("/:contactId/favorite", idValidation, ctrl.updateStatusContact);

module.exports = router;
