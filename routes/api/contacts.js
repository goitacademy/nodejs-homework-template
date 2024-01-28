const express = require("express");

const ContactController = require("../../controllers/contact");
const authMiddleware = require("../../middleware/auth");

const router = express.Router();
const jsonParser = express.json();

router.get("/", authMiddleware, ContactController.getContacts);

router.get("/:id", authMiddleware, ContactController.getContact);

router.post("/", authMiddleware, jsonParser, ContactController.createContact);

router.put("/:id", jsonParser, ContactController.updateContact);

router.delete("/:id", ContactController.deleteContact);

router.patch("/:id/favorite", jsonParser, ContactController.changeContactFavorite);

module.exports = router;