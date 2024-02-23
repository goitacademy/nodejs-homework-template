const express = require("express");

const contactController = require("../controllers/contacts");

const router = express.Router();

router.get("/", contactController.getAll);
router.get("/:contactId", contactController.getById);
router.post("/", contactController.addContact);
router.put("/:contactId", contactController.updateContact);
router.patch("/:contactId/favorite", contactController.setFavorite);
router.delete("/:contactId", contactController.removeContact);

module.exports = router;
