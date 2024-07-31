const express = require("express");

const ctrlContact = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrlContact.get);
router.get("/:contactId", ctrlContact.getById);
router.post("/", ctrlContact.create);
router.put("/:contactId", ctrlContact.update);
router.delete("/:contactId", ctrlContact.remove);
router.patch("/:contactId/status", ctrlContact.updateStatus);

module.exports = router;
