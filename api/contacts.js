const express = require("express");

const contactController = require("../controllers/contacts");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, contactController.getAll);
router.get("/:contactId", auth, contactController.getById);
router.post("/", auth, contactController.addContact);
router.put("/:contactId", auth, contactController.updateContact);
router.patch("/:contactId/favorite", auth, contactController.setFavorite);
router.delete("/:contactId", auth, contactController.removeContact);

module.exports = router;
