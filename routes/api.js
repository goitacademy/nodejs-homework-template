const express = require("express");
const router = express.Router();
const { updateFavoriteStatus } = require("./controllers/favoriteController");

router.patch("/api/contacts/:contactId/favorite", updateFavoriteStatus);

module.exports = router;
