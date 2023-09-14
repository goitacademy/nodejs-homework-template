const express = require("express");
const contact = require("../../controllers/contacts");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", contact.list);

router.get("/:contactId", isValidId, contact.getById);

router.post("/", contact.add);

router.put("/:contactId", isValidId, contact.update);

router.patch("/:contactId/favorite", isValidId, contact.updateFavorite);

router.delete("/:contactId", isValidId, contact.remove);

module.exports = router;
