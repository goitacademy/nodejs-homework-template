const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const idValidation = require("../../middlewares/idValidation");

router.get("/", ctrl.listContacts);

router.get("/:contactId", idValidation, ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", idValidation, ctrl.removeContact);

router.put("/:contactId", idValidation, ctrl.updateById);

router.patch("/:contactId/favorite", idValidation, ctrl.updateStatusContact);

module.exports = router;
