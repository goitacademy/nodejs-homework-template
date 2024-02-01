const express = require("express");
const router = express.Router();
const controllerContact = require("../../controllers/contacts");

router.get("/", controllerContact.get);

router.get("/:contactId", controllerContact.getById);

router.post("/", controllerContact.create);

router.delete("/:contactId", controllerContact.remove);

router.put("/:contactId", controllerContact.update);

router.patch("/:contactId/favorite", controllerContact.favouriteStatus);

module.exports = router;
