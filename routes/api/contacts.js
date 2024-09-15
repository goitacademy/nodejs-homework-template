const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controller");
const authMiddleware = require("../../middleware/auth");

router.get("/", authMiddleware.authenticate, ctrlContact.getContacts); 

router.get("/:contactId", ctrlContact.getById);

router.delete("/:contactId", ctrlContact.remove);

router.post("/", ctrlContact.create);

router.put("/:contactId", ctrlContact.update);

router.patch("/:contactId/favorite", ctrlContact.favorite);

module.exports = router;
