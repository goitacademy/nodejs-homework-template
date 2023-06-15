const express = require("express");

const router = express.Router();

const controller = require("../../controllers/contacts");

const { validator } = require("../../middlewares");
const scheme = require("../../schemes/contacts");

router.get("/", controller.listContacts);

router.get("/:id", controller.getContactById);

router.post("/", validator(scheme.objectStructure), controller.addContact);

router.put("/:id", validator(scheme.objectStructure), controller.updateContact);

router.delete("/:id", controller.removeContact);

module.exports = router;
