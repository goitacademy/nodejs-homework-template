const express = require("express");

const controller = require("../../controllers/contacts");

const { controllerWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", controllerWrapper(controller.getContacts));

router.get("/:contactId", controllerWrapper(controller.getContactById));

router.post("/", controllerWrapper(controller.addContact));

router.delete("/:contactId", controllerWrapper(controller.removeContactById));

router.put("/:contactId", controllerWrapper(controller.updateContactById));

module.exports = router;
