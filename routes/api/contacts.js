const express = require("express");
const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContact);

router.post("/", ctrl.postContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", ctrl.updateContact);

router.patch("/:contactId/favorite", ctrl.toggleContactFavorite);

module.exports = router;
