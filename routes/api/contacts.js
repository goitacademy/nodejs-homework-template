const express = require("express");
const router = express.Router();

const { contacts: controllers } = require("../../controllers");
const { auth } = require("../../middlewares");

router.get("/", auth, controllers.listContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", auth, controllers.addContact);

router.delete("/:contactId", controllers.removeContact);

router.put("/:contactId", controllers.updateContact);

router.patch("/:contactId/favorite", controllers.updateByFavorite);

module.exports = router;
