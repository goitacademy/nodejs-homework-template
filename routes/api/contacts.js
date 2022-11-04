const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contactsCtrl");
const validation = require("../../middlewares/contactsValidation");

router.get("/", contactsController.get);

router.get("/:contactId", contactsController.getOne);

router.post("/", validation.creatingContact, contactsController.post);

router.delete("/:contactId", contactsController.deleteOne);

router.put("/:contactId", validation.updatingContact, contactsController.putOne);

router.patch("/:contactId/favorite", validation.updatingContactStatus, contactsController.patchFavorite);

module.exports = router;
