const express = require("express");
const router = express.Router();

const controller = require("../../controllers/contacts");

router.get("/", controller.getListContacts);

router.get("/:id", controller.getContactById);

router.post("/", controller.addContact);

router.delete("/:id", controller.removeContact);

router.put("/:id", controller.updateContact);

module.exports = router;
