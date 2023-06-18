const express = require("express");
const router = express.Router();
const controler = require("../../controllers/index");

router.get("/", controler.getContacts);

router.get("/:contactId", controler.getContactById);

router.post("/", controler.addContact);

router.delete("/:contactId", controler.removeContact);

router.put("/:contactId", controler.updateContact);

router.patch("/:contactId/favorite", controler.updateFavorite);

module.exports = router;
