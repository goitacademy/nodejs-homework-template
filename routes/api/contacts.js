const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers/index");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContacts);

router.put("/:contactId", ctrl.updateContact);

router.patch("/:contactId/favorite", ctrl.updateFavorite);

module.exports = router;
