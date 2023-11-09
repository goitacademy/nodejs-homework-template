const express = require("express");

const controllers = require("../../controllers");

const router = express.Router();

router.get("/", controllers.getListContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", controllers.addContact);

router.put("/:contactId", controllers.updateContact);

router.delete("/:contactId", controllers.removeContact);

module.exports = router;
