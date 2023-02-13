const express = require("express");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const auth = require("../../middlewares/auth");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(auth), ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", ctrlWrapper(auth), ctrlWrapper(ctrl.addCont));

router.put("/:contactId", ctrlWrapper(ctrl.putCont));

router.patch("/:contactId/favorite", ctrlWrapper(ctrl.patchFav));

router.delete("/:contactId", ctrlWrapper(ctrl.delCont));

module.exports = router;
