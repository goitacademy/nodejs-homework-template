const express = require("express");
const router = express.Router();
const contactsController = require("../../controller/contacts.controller");

router.get("/contacts", contactsController.get);

router.get("/contacts/:id", contactsController.getById);

router.post("/contacts", contactsController.create);

router.put("/contacts/:id", contactsController.update);

router.patch("/contacts/:id/favorite", contactsController.updateFavorite);

router.delete("/contacts/:id", contactsController.remove);

module.exports = router;
