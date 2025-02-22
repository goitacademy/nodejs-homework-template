const express = require("express");

const { contacts: controller } = require("../../controllers/index");

const router = express.Router();

router.get("/", controller.listContacts);

router.get("/:contactId", controller.getContactById);

router.post("/", controller.addContact);

router.delete("/:contactId", controller.removeContact);

router.put("/:contactId", controller.updateContact);

module.exports = router;
