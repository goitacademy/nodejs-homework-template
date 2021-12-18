const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const wrapperCtrl = require("../../middlewares/wrapperCtrl");
const auth = require("../../middlewares/auth");

router.get("/", auth, wrapperCtrl(ctrl.getAll));

router.get("/:contactId", wrapperCtrl(ctrl.getById));

router.post("/", auth, wrapperCtrl(ctrl.addContact));

router.delete("/:contactId", wrapperCtrl(ctrl.deleteContact));

router.put("/:contactId", wrapperCtrl(ctrl.updateById));

router.patch("/:contactId/favorite", wrapperCtrl(ctrl.addFavorite));

module.exports = router;