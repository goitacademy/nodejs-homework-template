const express = require("express");
const router = express.Router();
const controller = require("../../controllers/index.js");

router.get("/", controller.getA llContacts);

router.get("/:contactId", controller.getContactById);

router.post("/", controller.addContact);

router.delete("/:contactId", controller.deleteContact);

router.put("/:contactId", controller.updateContactById);

module.exports = router;
