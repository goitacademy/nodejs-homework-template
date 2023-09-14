const express = require("express");
const router = express.Router();
const Controllers = require("../../controllers/Controllers");
const isValidId = require("../../middlewares/isValidId");

router.get("/", Controllers.GetAll);

router.get("/:id", isValidId, Controllers.GetById);

router.post("/", Controllers.AddContact);

router.put("/:contactId", isValidId, Controllers.UpdateById);

router.patch("/:contactId/favorite", isValidId, Controllers.UpdateFavoriteById);

module.exports = router;
