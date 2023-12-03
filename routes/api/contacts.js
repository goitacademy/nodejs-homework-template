const express = require("express");
const contactController = require("../../controllers");
const isValidID = require("../../middlewares/isValidID");

const router = express.Router();

router.get("/", contactController.get);
router.get("/:contactId", isValidID, contactController.getByID);
router.post("/", contactController.create);
router.put("/:contactId", isValidID, contactController.update);
router.patch("/:contactId/favorite", isValidID, contactController.updateFavorite);
router.delete("/:contactId", isValidID, contactController.remove);

module.exports = router;
