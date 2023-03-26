const express = require("express");

const { auth } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.get));

router.get("/:id", auth, ctrlWrapper(ctrl.getById));

router.post("/", auth, ctrlWrapper(ctrl.create));

router.put("/:id", auth, ctrlWrapper(ctrl.update));

router.patch("/:id/favorite", auth, ctrlWrapper(ctrl.updateFavorite));

router.delete("/:id", auth, ctrlWrapper(ctrl.remove));

module.exports = router;
