const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controller");

router.get("/", ctrlContact.get);

router.get("/:contactId", ctrlContact.getById);

router.post("/", ctrlContact.create);

router.put("/:contactId", ctrlContact.update);

router.patch("/:contactId/favorite", ctrlContact.updateStatusContact);

router.delete("/:contactId", ctrlContact.remove);

module.exports = router;
