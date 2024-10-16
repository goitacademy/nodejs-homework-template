const express = require("express");

const router = express.Router();

const controller = require("../../controllers/index");

router.get("/", controller.getContacts);

router.get("/:contactId", controller.getContactsById);

router.post("/", controller.createContact);

router.delete("/:contactId", controller.deleteContact);

router.put("/:contactId", controller.updateContact);

router.patch("/:contactId/favorite", controller.updateFavoriteStatus);

module.exports = router;
