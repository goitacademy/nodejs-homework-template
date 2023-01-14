const express = require("express");
const { contactController } = require("../../controllers");

const router = express.Router();

router.get("/", contactController.getAllContacts);
router.get("/:contactId", contactController.getContact);
router.post("/", contactController.addContact);
router.delete("/:contactId", contactController.deleteContact);
router.put("/:contactId", contactController.editContact);
router.patch("/:contactId/favorite", contactController.updateStatusContact);

module.exports = router;
