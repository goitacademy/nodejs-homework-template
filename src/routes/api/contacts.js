const express = require("express");
const controllers = require("../../controllers/contacts");

const router = express.Router();

router.get("/", controllers.getContacts);
router.get("/:contactId", controllers.getContactById);
router.delete("/:contactId", controllers.deleteContact);
router.post("/", controllers.createContact);
router.put("/:contactId", controllers.updateContact);

module.exports = router;
