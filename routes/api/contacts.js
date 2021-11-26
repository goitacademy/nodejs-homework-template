const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const wrapperCtrl = require("../../middlewares/wrapperCtrl");

router.get("/", wrapperCtrl(ctrl.getAll));

router.get("/:contactId", wrapperCtrl(ctrl.getById));

router.post("/", wrapperCtrl(ctrl.addContact));

router.delete("/:contactId", wrapperCtrl(ctrl.deleteContact));

router.put("/:contactId", wrapperCtrl(ctrl.updateById));

router.patch("/:contactId/favorite", wrapperCtrl(ctrl.addFavorite));

module.exports = router;
