const express = require("express");
const router = express.Router();
const controler = require("../../controllers/index");
const auth = require("../../service/token");

router.get("/", auth, controler.getContacts);

router.get("/:contactId", auth, controler.getContactById);

router.post("/", auth, controler.addContact);

router.delete("/:contactId", auth, controler.removeContact);

router.put("/:contactId", auth, controler.updateContact);

router.patch("/:contactId/favorite", auth, controler.updateFavorite);

module.exports = router;
