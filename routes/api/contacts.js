const express = require("express");
const contactController = require("../../controller/contacts.js");

const router = express.Router();

router.get("/", contactController.get);

router.get("/:contactId", contactController.getById);

router.post("/", contactController.createContact);

router.put("/:contactId", contactController.updateContact);

router.patch("/:contactId/favorite", contactController.updateFavorite);

router.delete("/:contactId", contactController.removeContact);

module.exports = router;
