const express = require("express");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.addCont);

router.put("/:contactId", ctrl.putCont);

router.patch("/:contactId/favorite", ctrl.patchFav);

router.delete("/:contactId", ctrl.delCont);

module.exports = router;
