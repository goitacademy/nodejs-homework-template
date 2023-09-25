const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts.controller");

router.get("/contacts", contactsController.get);

router.get("/contacts/:contactId", contactsController.getById);

router.post("/contacts", contactsController.create);

router.put("/contacts/:contactId", contactsController.update);

router.patch(
  "/contacts/:contactId/favorite",
  contactsController.updateFavorite
);

router.delete("/contacts/:contactId", contactsController.remove);

module.exports = router;
