const express = require("express");
const contactController = require("../../controllers/contacts");
const router = express.Router();

router.get("/", contactController.get);

router.get("/:contactId", contactController.getOne);

router.post("/", contactController.post);

router.delete("/:contactId", contactController.del);

router.put("/:contactId", contactController.put);

router.patch("/:contactId/favorite", contactController.patchFavorite);

module.exports = router;
