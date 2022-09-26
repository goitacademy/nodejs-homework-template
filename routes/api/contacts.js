const express = require("express");

const router = express.Router();

const controllers = require("../../controllers");

router.get("/", controllers.listContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", controllers.addContact);

router.delete("/:contactId", controllers.removeContact);

router.put("/:contactId", controllers.updateContact);

module.exports = router;
