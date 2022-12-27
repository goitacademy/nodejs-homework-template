const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contactsController");

router.get("/", contactController.contacts_list);

router.get("/:contactId", contactController.contact_get);

router.post("/", contactController.contact_create_post);

router.delete("/:contactId", contactController.contact_delete);

router.put("/:contactId", contactController.contact_update_put);

module.exports = router;
