const express = require("express");
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");

const { user } = require("../../middlewares");
const router = express.Router();

router.get("/", user, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", user, ctrlWrapper(ctrl.getById));

router.post("/", user, ctrlWrapper(ctrl.add));

router.delete("/:contactId", user, ctrlWrapper(ctrl.removeById));

router.put("/:contactId", user, ctrlWrapper(ctrl.updateById));

router.patch("/:contactId/favorite", user, ctrlWrapper(ctrl.updateFavorite));

module.exports = router;
