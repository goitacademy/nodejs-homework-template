const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { controllerWrapper } = require("../../middlewares");

router.get("/", controllerWrapper(ctrl.listContacts));

router.get("/:contactId", controllerWrapper(ctrl.getContactById));

router.post("/", controllerWrapper(ctrl.addContact));

router.delete("/:contactId", controllerWrapper(ctrl.removeContactById));

router.put("/:contactId", controllerWrapper(ctrl.updateContactById));

module.exports = router;
