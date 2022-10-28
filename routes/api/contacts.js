const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/contacts");

router.get("/", contactController.get);

router.get("/:contactId", contactController.getOne);

router.post("/", contactController.post);

// router.delete("/:contactId", contactController.deleteOne);

// router.put("/:contactId", contactController.putOne);

// router.patch("/:contactId", contactController.patchFavorite);

module.exports = router;
