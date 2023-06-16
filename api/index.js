const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contacts");

router.get("/", contactController.getAll);
router.get("/:contactId", contactController.getById);
router.post("", contactController.addContact);
router.put("/:contactId", contactController.updateContact);
router.patch("/:contactId/favorite", contactController.setFavorite);
router.delete("/:contactId", contactController.removeContact);

module.exports = router;
