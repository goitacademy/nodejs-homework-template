const express = require("express");
const router = express.Router();
const ctrlContact = require("../../models/contacts");

router.get("/", ctrlContact.get);

router.get("/:contactId", ctrlContact.getById);

router.post("/", ctrlContact.add);

router.put("/:contactId", ctrlContact.update);

router.delete("/:contactId", ctrlContact.remove);

router.patch("/:contactId/favorite", ctrlContact.favorite);

module.exports = router;
