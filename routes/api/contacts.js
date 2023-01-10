const express = require("express");
const router = express.Router();

const { controllerContacts } = require("../../controllers");
const { authMiddleware } = require("../../middlewares");

// =====================  GET ALL  =====================
// using authMiddleware to verify that the owner(user) can get only thier contacts.
// contacts that belong to specific user (with their id)
router.get("/", authMiddleware, controllerContacts.getAllContacts);

// =====================  GET BY ID  =====================
router.get("/:contactId", controllerContacts.getById);

// =====================  ADD CONTACT  ==================
// using authMiddleware to verify that only logged-in user can add contacts
router.post("/", authMiddleware, controllerContacts.addContact);

// =====================  UPDATE CONTACT BY ID ==================
router.put("/:contactId", controllerContacts.updateById);

// =====================  UPDATE CONTACT BY CATEGORY FAVORITE ==================
router.patch("/:contactId/favorite", controllerContacts.updateStatusContact);

// =====================  DELETE CONTACT BY ID ==================
router.delete("/:contactId", controllerContacts.deleteContact);

module.exports = router;
