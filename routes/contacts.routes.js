const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts.controller");

router.get("/", contactsController.get);

router.get("/:id", contactsController.getById);

router.post("/", contactsController.create);

router.put("/:id", contactsController.update);

router.patch("/:id/favorite", contactsController.updateFavorite);

router.delete("/:id", contactsController.remove);

module.exports = router;
