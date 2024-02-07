const express = require("express");

const ContactController = require("../../controllers/contact");
const authMiddleware = require("../../middleware/auth");
const { validSchema, validSchemaFavorite } = require("../../models/contact");
const { validateBody } = require("../../middleware/validateBody");

const router = express.Router();
const jsonParser = express.json();

router.get("/", authMiddleware, ContactController.getContacts);

router.get("/:id", authMiddleware, ContactController.getContact);

router.post("/", authMiddleware, jsonParser, validateBody(validSchema), ContactController.createContact);

router.put("/:id", authMiddleware, jsonParser, ContactController.updateContact);

router.delete("/:id", authMiddleware, ContactController.deleteContact);

router.patch("/:id/favorite", authMiddleware, jsonParser, validateBody(validSchemaFavorite), ContactController.changeContactFavorite);

module.exports = router;
module.exports = router;