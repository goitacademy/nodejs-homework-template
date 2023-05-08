const express = require("express");
const ctrlContact = require("../../controller/contacts");
const auth = require("../../middlewares/auth");
const controllerWrapper = require("../../helpers/controllerWrapper");
const router = express.Router();
router.get("/", controllerWrapper(auth), ctrlContact.get);
router.get("/:contactId", controllerWrapper(auth), ctrlContact.getById);
router.post("/", controllerWrapper(auth), ctrlContact.addContact);
router.delete("/:contactId", controllerWrapper(auth), ctrlContact.removeContact);
router.put("/:contactId", controllerWrapper(auth), ctrlContact.updateContact);
router.patch("/:contactId/favorite", controllerWrapper(auth), ctrlContact.updateFavorite);

module.exports = router;
