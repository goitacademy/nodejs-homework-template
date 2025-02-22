const express = require("express");
const router = express.Router();
const ctrlContacts = require("../../controller/contacts");
const authMiddleware = require("../../middleware/auth");

router.get("/", authMiddleware, ctrlContacts.get);

router.get("/:contactId", authMiddleware, ctrlContacts.getById);

router.post("/", authMiddleware, ctrlContacts.create);

router.delete("/:contactId", authMiddleware, ctrlContacts.remove);

router.put("/:contactId", authMiddleware, ctrlContacts.update);

router.patch("/:contactId/favorite", authMiddleware, ctrlContacts.updateStatus);
module.exports = router;
