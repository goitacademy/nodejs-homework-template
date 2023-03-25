const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");

router.get("/", ctrlWrapper(ctrl.get));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", ctrlWrapper(ctrl.create));

router.put("/:id", ctrlWrapper(ctrl.update));

router.patch("/:id/favorite", ctrlWrapper(ctrl.updateFavorite));

router.delete("/:id", ctrlWrapper(ctrl.remove));

module.exports = router;
