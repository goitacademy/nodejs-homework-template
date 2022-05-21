const express = require("express");
const router = express.Router();

const { contacts: controllers } = require("../../controllers/index");

router.get("/", controllers.listContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", controllers.removeContact);

router.delete("/:contactId", controllers.addContact);

router.put("/:contactId", controllers.updateContact);

module.exports = router;
