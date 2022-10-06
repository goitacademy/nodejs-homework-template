const express = require("express");
const controller = require("../../controllers/contacts");
const { controllerWrapper } = require("../../helpers");
const router = express.Router();

router.get("/", controllerWrapper(controller.listContacts));

router.get("/:contactId", controllerWrapper(controller.getContactById));

router.post("/", controllerWrapper(controller.addContact));

router.delete("/:contactId", controllerWrapper(controller.removeContact));

router.put("/:contactId", controllerWrapper(controller.updateContact));

module.exports = router;
